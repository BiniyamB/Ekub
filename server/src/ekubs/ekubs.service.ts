import {
  BadRequestException,
  Injectable,
  MessageEvent,
  NotFoundException,
} from '@nestjs/common';
import { interval, merge, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  Cycle,
  EkubStatus,
  Prisma,
  type Ekub,
} from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEkubDto } from './dto/create-ekub.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import {
  AssignMemberQuotaDto,
  UpdateEkubDto,
  UpdateMemberDto,
} from './dto/update-ekub.dto';

/** A unit of money that still needs to be placed in a quota slot. `partial`
 *  is true when the source row is already allocated elsewhere and only its
 *  remaining (preferredAmount - quotaAmount) is being placed. */
type AssignCandidate = {
  id: number;
  ekubId: number;
  name: string;
  address: string;
  phone: string | null;
  amount: number;
  partial: boolean;
};

/** SSE payload pushed to public watchers of an ekub. */
type EkubDrawEvent = {
  type: 'draw' | 'reverse' | 'reset';
  ekubId: number;
  pending: Array<{
    id: number;
    position: number;
    members: Array<{ name: string }>;
  }>;
  winner: {
    id: number;
    position: number;
    members: Array<{ name: string }>;
  } | null;
};

@Injectable()
export class EkubsService {
  /** Pushed to every SSE subscriber of an ekub whenever a draw-related event
   *  happens, so public watchers see it without polling. */
  private readonly drawEvents = new Subject<EkubDrawEvent>();

  constructor(private prisma: PrismaService) {}

  /** Realtime stream for the public watch page. `ekubId: 0` broadcasts to all
   *  ekubs (used by the reset-all-draws action). */
  drawStream(ekubId: number): Observable<MessageEvent> {
    return merge(
      this.drawEvents.pipe(
        filter((e) => e.ekubId === 0 || e.ekubId === ekubId),
        map((e) => ({
          type: 'ekub-event',
          data: JSON.stringify(e),
        })),
      ),
      interval(20000).pipe(map(() => ({ type: 'heartbeat', data: '{}' }))),
    );
  }

  private emit(event: EkubDrawEvent) {
    this.drawEvents.next(event);
  }

  async create(dto: CreateEkubDto) {
    const ekub = await this.prisma.$transaction(async (tx) => {
      const created = await tx.ekub.create({
        data: {
          name: dto.name,
          description: dto.description,
          quotaAmount: dto.quotaAmount,
          totalQuotas: dto.totalQuotas,
          cycle: dto.cycle,
          startDate: dto.startDate ?? new Date(),
        },
      });
      await tx.quota.createMany({
        data: Array.from({ length: dto.totalQuotas }, (_, i) => ({
          ekubId: created.id,
          position: i + 1,
        })),
      });
      return created;
    });
    return this.findOne(ekub.id);
  }

  async findAll() {
    const ekubs = await this.prisma.ekub.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        members: { orderBy: { id: 'asc' } },
        quotas: {
          include: {
            members: true,
            payments: { select: { amount: true } },
          },
          orderBy: { position: 'asc' },
        },
      },
    });
    return ekubs.map((e) => this.decorate(e));
  }

  async findOne(id: number) {
    const ekub = await this.prisma.ekub.findUnique({
      where: { id },
      include: {
        members: { orderBy: { id: 'asc' } },
        quotas: {
          include: {
            members: true,
            payments: {
              include: { member: true, recipient: true },
              orderBy: { createdAt: 'desc' },
            },
          },
          orderBy: { position: 'asc' },
        },
      },
    });
    if (!ekub) throw new NotFoundException('Ekub not found');
    return this.decorate(ekub);
  }

  /** Who-pays-who plan for every drawn round. Each member of the drawn quota
   *  is a winner and keeps their own registered share, so the other
   *  (totalQuotas - 1) shares of their amount are collected from the rest of
   *  the members. The system assigns each payer to exactly one winner so every
   *  winner's assigned payers sum to their pot. Receipts chosen by the admin
   *  are verified against the assignment. */
  async paymentPlan(ekubId: number) {
    const ekub = await this.prisma.ekub.findUnique({
      where: { id: ekubId },
      include: {
        quotas: {
          include: {
            members: true,
            payments: { include: { member: true, recipient: true } },
          },
          orderBy: { position: 'asc' },
        },
        members: true,
      },
    });
    if (!ekub) throw new NotFoundException('Ekub not found');

    const round2 = (n: number) => Math.round(n * 100) / 100;
    const round1 = (n: number) => Math.round(n * 10) / 10;
    const realId = (m: { shareGroup: number | null; id: number }) =>
      m.shareGroup ?? m.id;
    const paidInFull = (paid: number, owed: number) =>
      owed <= 0 || paid >= Math.floor(owed + 0.001);
    const persons = ekub.members.filter((m) => m.shareGroup == null);
    const slots = ekub.totalQuotas || 1;
    // A winner keeps their own registered share, so only the other (slots - 1)
    // shares are paid to them by the remaining members.
    const potOf = (fill: number) => round2(fill * (slots - 1));

    const roundsPlan = ekub.quotas
      .filter((q) => q.status === 'SELECTED' && q.members.length > 0)
      .map((q) => {
        // A person may appear several times in a quota (split shares), so
        // winners are grouped by real identity and their fills summed.
        const byRealId = new Map<number, (typeof q.members)[number][]>();
        for (const m of q.members) {
          const key = realId(m);
          const list = byRealId.get(key) ?? [];
          list.push(m);
          byRealId.set(key, list);
        }

        const winners = [...byRealId.values()].map((rows) => {
          const first = rows[0];
          const fill = rows.reduce(
            (s, m) => s + (m.quotaAmount ?? m.preferredAmount),
            0,
          );
          const received = q.payments
            .filter((p) => p.recipient && realId(p.recipient) === realId(first))
            .reduce((s, p) => s + p.amount, 0);
          return {
            memberId: first.id,
            realId: realId(first),
            name: first.name,
            fill,
            pot: potOf(fill),
            received: round2(received),
            receivedPercent: 0,
            assigned: [] as {
              memberId: number;
              name: string;
              amount: number;
            }[],
          };
        });

        // Every registered member who is not one of the winners pays their
        // full registered amount in this round.
        const winnerIds = new Set(winners.map((w) => w.realId));
        const pool = persons
          .filter((p) => !winnerIds.has(p.id))
          .map((p) => ({
            memberId: p.id,
            name: p.name,
            amount: p.preferredAmount,
          }))
          .filter((p) => p.amount > 0);

        // The system decides who pays whom: winners are filled one by one
        // (largest pot first), each taking the payer that fits the remaining
        // target best, so every winner's assigned payers sum to their pot.
        const ordered = [...winners].sort((a, b) => b.pot - a.pot);
        for (const w of ordered) {
          let remaining = w.pot;
          while (remaining > 0.004 && pool.length > 0) {
            let fit = -1;
            let fitAmount = 0;
            let smallest = 0;
            for (let i = 0; i < pool.length; i++) {
              if (
                pool[i].amount <= remaining + 0.004 &&
                pool[i].amount > fitAmount
              ) {
                fit = i;
                fitAmount = pool[i].amount;
              }
              if (pool[i].amount < pool[smallest].amount) smallest = i;
            }
            const take = fit >= 0 ? fit : smallest;
            const payer = pool.splice(take, 1)[0];
            w.assigned.push({
              memberId: payer.memberId,
              name: payer.name,
              amount: round2(payer.amount),
            });
            remaining -= payer.amount;
          }
        }

        for (const w of winners) {
          w.receivedPercent =
            w.pot > 0 ? round1(Math.min(100, (w.received / w.pot) * 100)) : 0;
        }

        const payers = winners.flatMap((w) =>
          w.assigned.map((a) => {
            const paid = q.payments
              .filter((pay) => realId(pay.member) === a.memberId)
              .reduce((s, pay) => s + pay.amount, 0);
            return {
              memberId: a.memberId,
              name: a.name,
              paysTo: w.realId,
              paysToName: w.name,
              owed: round2(a.amount),
              paid: round2(paid),
              percent:
                a.amount > 0
                  ? round1(Math.min(100, (paid / a.amount) * 100))
                  : 100,
              status: paidInFull(paid, a.amount)
                ? 'PAID'
                : paid > 0
                  ? 'PARTIAL'
                  : 'UNPAID',
            };
          }),
        );

        return {
          quotaId: q.id,
          position: q.position,
          winnerAt: q.winnerAt,
          pot: round2(winners.reduce((s, w) => s + w.pot, 0)),
          winners,
          payers,
          receipts: q.payments.map((p) => ({
            id: p.id,
            payerId: p.memberId,
            payerName: p.member?.name ?? '',
            payeeId: p.recipientId,
            payeeName: p.recipient?.name ?? '',
            amount: p.amount,
            receiptUrl: p.receiptUrl,
            paidAt: p.paidAt,
          })),
        };
      });

    const acc = roundsPlan.reduce(
      (a, r) => {
        for (const p of r.payers) {
          a.totalOwed += p.owed;
          a.totalPaid += p.paid;
          const prev = a.persons.get(p.memberId);
          a.persons.set(p.memberId, {
            memberId: p.memberId,
            name: p.name,
            owed: (prev?.owed ?? 0) + p.owed,
            paid: (prev?.paid ?? 0) + p.paid,
          });
        }
        return a;
      },
      {
        totalOwed: 0,
        totalPaid: 0,
        persons: new Map<
          number,
          { memberId: number; name: string; owed: number; paid: number }
        >(),
      },
    );

    const personsSummary = [...acc.persons.values()]
      .map((p) => ({
        memberId: p.memberId,
        name: p.name,
        owed: round2(p.owed),
        paid: round2(p.paid),
        percent:
          p.owed > 0 ? round1(Math.min(100, (p.paid / p.owed) * 100)) : 100,
        status: paidInFull(p.paid, p.owed)
          ? 'PAID'
          : p.paid > 0
            ? 'PARTIAL'
            : 'UNPAID',
      }))
      .sort((a, b) => a.percent - b.percent || b.owed - a.owed);

    return {
      ekubId,
      quotaAmount: ekub.quotaAmount,
      totalQuotas: ekub.totalQuotas,
      rounds: roundsPlan,
      totalOwed: round2(acc.totalOwed),
      totalPaid: round2(acc.totalPaid),
      overallPercent:
        acc.totalOwed > 0
          ? round1(Math.min(100, (acc.totalPaid / acc.totalOwed) * 100))
          : 0,
      paidPersons: personsSummary.filter((p) => p.status === 'PAID').length,
      partialPersons: personsSummary.filter((p) => p.status === 'PARTIAL')
        .length,
      unpaidPersons: personsSummary.filter((p) => p.status === 'UNPAID').length,
      persons: personsSummary,
    };
  }

  async registerMember(ekubId: number, dto: CreateMemberDto) {
    const ekub = await this.prisma.ekub.findUnique({ where: { id: ekubId } });
    if (!ekub) throw new NotFoundException('Ekub not found');
    if (ekub.status !== EkubStatus.ACTIVE) {
      throw new BadRequestException('Ekub is not active');
    }
    await this.prisma.member.create({
      data: {
        ekubId,
        name: dto.name,
        address: dto.address,
        phone: dto.phone,
        preferredAmount: dto.preferredAmount,
      },
    });
    return this.findOne(ekubId);
  }

  async updateEkub(ekubId: number, dto: UpdateEkubDto) {
    const ekub = await this.prisma.ekub.findUnique({ where: { id: ekubId } });
    if (!ekub) throw new NotFoundException('Ekub not found');
    if (ekub.status !== EkubStatus.ACTIVE) {
      throw new BadRequestException(
        'Only active ekubs can have their plan edited',
      );
    }
    await this.prisma.ekub.update({
      where: { id: ekubId },
      data: {
        name: dto.name,
        description: dto.description,
        cycle: dto.cycle,
        startDate: dto.startDate,
        quotaAmount: dto.quotaAmount,
        totalQuotas: dto.totalQuotas,
      },
    });
    return this.findOne(ekubId);
  }

  async updateMember(ekubId: number, memberId: number, dto: UpdateMemberDto) {
    const member = await this.prisma.member.findFirst({
      where: { id: memberId, ekubId },
    });
    if (!member) throw new NotFoundException('Member not found');
    await this.prisma.member.update({
      where: { id: memberId },
      data: {
        name: dto.name,
        address: dto.address,
        phone: dto.phone,
        preferredAmount: dto.preferredAmount,
        quotaAmount:
          member.quotaAmount === member.preferredAmount
            ? dto.preferredAmount
            : member.quotaAmount,
      },
    });
    return this.findOne(ekubId);
  }

  async assignMemberToQuota(
    ekubId: number,
    memberId: number,
    dto: AssignMemberQuotaDto,
  ) {
    const member = await this.prisma.member.findFirst({
      where: { id: memberId, ekubId },
    });
    if (!member) throw new NotFoundException('Member not found');
    const quotaId = dto.quotaId && dto.quotaId > 0 ? dto.quotaId : null;
    if (quotaId) {
      const quota = await this.prisma.quota.findFirst({
        where: { id: quotaId, ekubId },
      });
      if (!quota) throw new NotFoundException('Quota not found');
    }
    await this.prisma.member.update({
      where: { id: memberId },
      data: {
        quotaId,
        quotaAmount: quotaId ? (dto.amount ?? member.preferredAmount) : null,
      },
    });
    return this.findOne(ekubId);
  }

  /** Replaces the whole member list of a quota with the given entries.
   *  Each entry sets which member fills the slot and the exact amount that
   *  member contributes there (per-slot share). Members removed from the
   *  list are unassigned. If a member is already allocated in another quota,
   *  allocating them here DEDUCTS the new amount from that other quota, so a
   *  person can hold shares in several quotas without double-counting money. */
  async setQuotaMembers(
    ekubId: number,
    quotaId: number,
    entries: { memberId: number; amount: number }[],
  ) {
    const quota = await this.prisma.quota.findFirst({
      where: { id: quotaId, ekubId },
      include: { members: true },
    });
    if (!quota) throw new NotFoundException('Quota not found');

    const ekubMembers = await this.prisma.member.findMany({
      where: { ekubId },
    });
    const byId = new Map(ekubMembers.map((m) => [m.id, m]));
    const validIds = new Set(ekubMembers.map((m) => m.id));
    const unique = new Map<number, number>();
    for (const entry of entries) {
      if (!validIds.has(entry.memberId)) {
        throw new BadRequestException(
          `Member #${entry.memberId} does not belong to this ekub.`,
        );
      }
      if (entry.amount == null || entry.amount <= 0) {
        throw new BadRequestException(
          `Member #${entry.memberId} needs a positive amount.`,
        );
      }
      unique.set(entry.memberId, entry.amount);
    }

    const ops: Prisma.PrismaPromise<unknown>[] = [
      this.prisma.member.updateMany({
        where: { ekubId, quotaId },
        data: { quotaId: null, quotaAmount: null },
      }),
    ];

    for (const [memberId, amount] of unique) {
      const member = byId.get(memberId)!;
      const realId = member.shareGroup ?? member.id;

      // Member is already inside this quota (or unassigned) — just set the share.
      const comingFromOtherQuota =
        member.quotaId != null && member.quotaId !== quotaId;

      if (!comingFromOtherQuota) {
        ops.push(
          this.prisma.member.update({
            where: { id: member.id },
            data: { quotaId, quotaAmount: amount },
          }),
        );
        continue;
      }

      // The member is allocated in another quota. Deduct the new amount from
      // that old quota: the member keeps the remainder there, and the new
      // amount appears here as a second share of the same person. The
      // member's preferredAmount stays their registered total, so any part
      // not placed anywhere shows up as unallocated.
      const oldAmount = member.quotaAmount ?? member.preferredAmount;
      const remaining = oldAmount - amount;

      if (remaining > 0) {
        ops.push(
          this.prisma.member.update({
            where: { id: member.id },
            data: { quotaAmount: remaining },
          }),
        );
        ops.push(
          this.prisma.member.create({
            data: {
              ekubId,
              name: member.name,
              address: member.address,
              phone: member.phone,
              preferredAmount: amount,
              quotaAmount: amount,
              shareGroup: realId,
              quotaId,
            },
          }),
        );
      } else {
        // The new amount consumes the old share completely — just move the
        // member here and leave the old quota with nothing.
        ops.push(
          this.prisma.member.update({
            where: { id: member.id },
            data: { quotaId, quotaAmount: amount },
          }),
        );
      }
    }

    await this.prisma.$transaction(ops);

    const ekub = await this.findOne(ekubId);
    const updated = ekub.quotas.find((q) => q.id === quotaId);
    const total = (updated?.members ?? []).reduce(
      (s, m) => s + (m.quotaAmount ?? m.preferredAmount),
      0,
    );
    const warnings =
      total === ekub.quotaAmount
        ? []
        : [
            `Quota #${updated?.position} total is ${total}, but the quota value is ${ekub.quotaAmount}.`,
          ];
    return { ekub, warnings };
  }

  async registerMembers(ekubId: number, dtos: CreateMemberDto[]) {
    const ekub = await this.prisma.ekub.findUnique({ where: { id: ekubId } });
    if (!ekub) throw new NotFoundException('Ekub not found');
    await this.prisma.member.createMany({
      data: dtos.map((d) => ({
        ekubId,
        name: d.name,
        address: d.address,
        phone: d.phone,
        preferredAmount: d.preferredAmount,
      })),
    });
    return this.findOne(ekubId);
  }

  /** Assigns every unallocated amount into the remaining space of non-drawn
   *  quotas. A person's unallocated amount is their registered total
   *  (preferredAmount) minus everything already placed across all their
   *  shares, so money deducted from one quota is still usable elsewhere.
   *  Partially filled quotas are topped up too, not just empty slots. */
  async generateQuotas(ekubId: number) {
    const ekub = await this.prisma.ekub.findUnique({
      where: { id: ekubId },
      include: {
        quotas: { include: { members: true }, orderBy: { position: 'asc' } },
        members: true,
      },
    });
    if (!ekub) throw new NotFoundException('Ekub not found');

    const capacity = ekub.quotaAmount;
    const available = ekub.quotas.filter((q) => q.status !== 'SELECTED');

    // Per-person registered totals and already-placed amounts. The registered
    // total only comes from rows without a shareGroup (the primary row); share
    // rows just record where the person's money already sits.
    const hasPrimary = new Set(
      ekub.members.filter((m) => m.shareGroup == null).map((m) => m.id),
    );
    const registered = new Map<number, number>();
    const allocated = new Map<number, number>();
    for (const m of ekub.members) {
      const realId = m.shareGroup ?? m.id;
      allocated.set(
        realId,
        (allocated.get(realId) ?? 0) + (m.quotaAmount ?? 0),
      );
      if (m.shareGroup == null || !hasPrimary.has(realId)) {
        registered.set(
          realId,
          (registered.get(realId) ?? 0) + m.preferredAmount,
        );
      }
    }

    const candidates: AssignCandidate[] = [];
    for (const [realId, total] of registered) {
      const placed = allocated.get(realId) ?? 0;
      const unallocated = total - placed;
      if (unallocated <= 0) continue;
      const src =
        ekub.members.find(
          (m) => m.shareGroup == null && (m.shareGroup ?? m.id) === realId,
        ) ?? ekub.members.find((m) => (m.shareGroup ?? m.id) === realId);
      if (!src) continue;
      candidates.push({
        id: src.id,
        ekubId: src.ekubId,
        name: src.name,
        address: src.address,
        phone: src.phone,
        amount: unallocated,
        partial: placed > 0,
      });
    }

    if (candidates.length === 0) {
      const short = available
        .map((q) => ({
          pos: q.position,
          gap:
            capacity -
            q.members.reduce(
              (s, m) => s + (m.quotaAmount ?? m.preferredAmount),
              0,
            ),
        }))
        .filter((g) => g.gap > 0);
      if (short.length > 0) {
        return {
          ekub: await this.findOne(ekubId),
          assignedGroups: 0,
          warnings: [
            `Quota #${short
              .map((g) => g.pos)
              .join(
                ', ',
              )} ${short.length === 1 ? 'is' : 'are'} short by ${short.reduce((s, g) => s + g.gap, 0)} — but no member has an unallocated amount to fill it.`,
          ],
        };
      }
      return {
        ekub: await this.findOne(ekubId),
        assignedGroups: 0,
        warnings: ['All members are fully assigned.'],
      };
    }

    if (available.length === 0) {
      return {
        ekub: await this.findOne(ekubId),
        assignedGroups: 0,
        warnings: ['No quotas available to assign members to.'],
      };
    }

    const usedOf = (q: (typeof available)[number]) =>
      q.members.reduce((s, m) => s + (m.quotaAmount ?? m.preferredAmount), 0);

    const warnings: string[] = [];
    const overfull = available.filter((q) => usedOf(q) > capacity);
    if (overfull.length > 0) {
      warnings.push(
        `Quota #${overfull
          .map((q) => q.position)
          .join(
            ', ',
          )} already exceed(s) the quota value and were left untouched.`,
      );
    }

    const totalExpected = capacity * ekub.totalQuotas;
    const placed = ekub.quotas.reduce(
      (s, q) =>
        s +
        q.members.reduce((t, m) => t + (m.quotaAmount ?? m.preferredAmount), 0),
      0,
    );
    const totalMoney = placed + candidates.reduce((s, c) => s + c.amount, 0);
    if (totalMoney !== totalExpected) {
      warnings.push(
        `Total member amount (${totalMoney}) does not equal quota × slots (${totalExpected}).`,
      );
    }

    const slots = available.map((q) => ({
      id: q.id,
      used: Math.min(usedOf(q), capacity),
    }));
    const totalGap = slots.reduce((s, sl) => s + (capacity - sl.used), 0);
    if (totalGap <= 0) {
      warnings.push('No quota space left to assign members into.');
      return {
        ekub: await this.findOne(ekubId),
        assignedGroups: 0,
        warnings,
      };
    }

    const result = await this.assignMembers(ekub, candidates, slots);
    return {
      ekub: await this.findOne(ekubId),
      assignedGroups: result.assignedGroups,
      warnings: [...warnings, ...result.warnings],
    };
  }

  /** Clears every assignment and redistributes all members so each slot
   *  sums as close to the quota value as possible (splitting members into
   *  shares when needed to hit the target exactly). */
  async rebalanceQuotas(ekubId: number) {
    const ekub = await this.prisma.ekub.findUnique({
      where: { id: ekubId },
      include: {
        quotas: { include: { members: true }, orderBy: { position: 'asc' } },
        members: true,
      },
    });
    if (!ekub) throw new NotFoundException('Ekub not found');
    if (ekub.quotas.some((q) => q.status === 'SELECTED')) {
      throw new BadRequestException(
        'Cannot rebalance after a winner has already been drawn.',
      );
    }
    if (ekub.members.length === 0) {
      throw new BadRequestException('No members to rebalance');
    }

    await this.prisma.member.updateMany({
      where: { ekubId },
      data: { quotaId: null, quotaAmount: null },
    });

    // Rebuild from registered totals: one candidate per person (primary row).
    // Stale share rows are removed — rebalance re-splits people as needed.
    await this.prisma.member.deleteMany({
      where: { ekubId, shareGroup: { not: null } },
    });
    const persons = ekub.members.filter((m) => m.shareGroup == null);
    const candidates: AssignCandidate[] = persons.map((m) => ({
      id: m.id,
      ekubId: m.ekubId,
      name: m.name,
      address: m.address,
      phone: m.phone,
      amount: m.preferredAmount,
      partial: false,
    }));
    const result = await this.assignMembers(ekub, candidates, ekub.quotas);
    return {
      ekub: await this.findOne(ekubId),
      assignedGroups: result.assignedGroups,
      warnings: result.warnings,
    };
  }

  /** Core assignment: pack as many whole candidates as possible, then split
   *  only the leftover ones into shares so every slot sums exactly to the
   *  quota value. Falls back to even distribution when the totals don't
   *  line up. A `partial` candidate's unallocated money is placed as new
   *  share rows without touching the registered preferredAmount. */
  private async assignMembers(
    ekub: { id: number; quotaAmount: number; totalQuotas: number },
    candidates: AssignCandidate[],
    slots: { id: number; used?: number }[],
  ): Promise<{ assignedGroups: number; warnings: string[] }> {
    if (slots.length === 0) {
      throw new BadRequestException(
        'No quota slots available to assign members to.',
      );
    }

    const capacity = ekub.quotaAmount;
    const memberSum = candidates.reduce((s, c) => s + c.amount, 0);
    const totalGap = slots.reduce(
      (s, sl) => s + (capacity - (sl.used ?? 0)),
      0,
    );
    const warnings: string[] = [];

    // Exact fill is impossible when the sums don't line up — distribute evenly.
    if (memberSum !== totalGap) {
      warnings.push(
        `Total member amount (${memberSum}) can't fill the remaining space across ${slots.length} slot(s) of exactly ${capacity}. Members were distributed evenly instead — slot totals may differ from the quota value.`,
      );
      await this.assignEvenly(candidates, slots);
      return { assignedGroups: slots.length, warnings };
    }

    // 1. Pack as many whole members as possible (largest first, best-fit).
    const sorted = [...candidates].sort((a, b) => b.amount - a.amount);
    const bins = slots.map((s) => ({
      quotaId: s.id,
      total: s.used ?? 0,
      memberIds: [] as number[],
    }));
    const splitPool: typeof sorted = [];
    for (const m of sorted) {
      if (m.amount > capacity) {
        splitPool.push(m);
        continue;
      }
      let best: (typeof bins)[number] | null = null;
      for (const b of bins) {
        if (
          b.total + m.amount <= capacity &&
          (best === null || b.total > best.total)
        ) {
          best = b;
        }
      }
      if (best) {
        best.memberIds.push(m.id);
        best.total += m.amount;
      } else {
        splitPool.push(m);
      }
    }

    // 2. Fill the leftover gaps by cutting split members into shares.
    //    Bigger gaps pair with bigger members so each share stays large.
    const residualOrder = bins
      .map((b, i) => ({ index: i, gap: capacity - b.total }))
      .sort((a, b) => b.gap - a.gap);
    const splitOrder = [...splitPool].sort((a, b) => b.amount - a.amount);
    const piecesByMember = new Map<
      number,
      { quotaId: number; amount: number }[]
    >();
    let head =
      splitOrder.length > 0
        ? { ...splitOrder[0], remaining: splitOrder[0].amount, position: 0 }
        : null;
    for (const { index, gap } of residualOrder) {
      let need = gap;
      while (need > 0 && head) {
        const take = Math.min(head.remaining, need);
        if (!piecesByMember.has(head.id)) piecesByMember.set(head.id, []);
        piecesByMember
          .get(head.id)!
          .push({ quotaId: bins[index].quotaId, amount: take });
        head.remaining -= take;
        need -= take;
        if (head.remaining === 0) {
          const next = head.position + 1;
          head =
            next < splitOrder.length
              ? {
                  ...splitOrder[next],
                  remaining: splitOrder[next].amount,
                  position: next,
                }
              : null;
        }
      }
    }

    const shareOf = (c: AssignCandidate, quotaId: number, amount: number) =>
      this.prisma.member.create({
        data: {
          ekubId: c.ekubId,
          name: c.name,
          address: c.address,
          phone: c.phone,
          preferredAmount: amount,
          quotaAmount: amount,
          shareGroup: c.id,
          quotaId,
        },
      });

    // 3. Persist: whole members keep their name, split members become shares.
    //    quotaAmount records each member's contribution inside its slot
    //    (defaults to preferredAmount); extra share rows of the same person
    //    share shareGroup so real-people counts stay accurate. A partial
    //    candidate's unallocated money is placed as a new share row without
    //    touching the registered preferredAmount.
    const amountById = new Map(candidates.map((c) => [c.id, c.amount]));
    for (const b of bins) {
      for (const memberId of b.memberIds) {
        const c = candidates.find((x) => x.id === memberId)!;
        if (c.partial) {
          await shareOf(c, b.quotaId, amountById.get(memberId)!);
        } else {
          await this.prisma.member.update({
            where: { id: memberId },
            data: { quotaId: b.quotaId, quotaAmount: amountById.get(memberId) },
          });
        }
      }
    }

    let splitCount = 0;
    for (const [memberId, pieces] of piecesByMember) {
      const c = candidates.find((x) => x.id === memberId)!;
      if (pieces.length <= 1) {
        if (pieces.length === 1) {
          if (c.partial) {
            await shareOf(c, pieces[0].quotaId, pieces[0].amount);
          } else {
            await this.prisma.member.update({
              where: { id: memberId },
              data: {
                quotaId: pieces[0].quotaId,
                quotaAmount: c.amount,
              },
            });
          }
        }
        continue;
      }
      splitCount += 1;
      if (c.partial) {
        await this.prisma.$transaction(
          pieces.map((p) => shareOf(c, p.quotaId, p.amount)),
        );
        continue;
      }
      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        if (i === 0) {
          await this.prisma.member.update({
            where: { id: memberId },
            data: {
              name: `${c.name}1`,
              preferredAmount: p.amount,
              quotaAmount: p.amount,
              quotaId: p.quotaId,
            },
          });
        } else {
          await this.prisma.member.create({
            data: {
              ekubId: c.ekubId,
              name: `${c.name}${i + 1}`,
              address: c.address,
              phone: c.phone,
              preferredAmount: p.amount,
              quotaAmount: p.amount,
              shareGroup: memberId,
              quotaId: p.quotaId,
            },
          });
        }
      }
    }

    if (splitCount > 0) {
      warnings.push(
        `Every slot is exactly ${capacity}. To keep as many members whole as possible, only ${splitCount} member(s) had to be split into shares (e.g. "Name1", "Name2").`,
      );
    }

    return { assignedGroups: slots.length, warnings };
  }

  /** Distributes members across slots as evenly as possible (no exact sums). */
  private async assignEvenly(
    candidates: AssignCandidate[],
    slots: { id: number; used?: number }[],
  ) {
    const sorted = [...candidates].sort((a, b) => b.amount - a.amount);
    const buckets = slots.map((s) => ({
      quotaId: s.id,
      total: s.used ?? 0,
      memberIds: [] as number[],
    }));
    for (const m of sorted) {
      const target = buckets.reduce((min, b) =>
        b.total < min.total ? b : min,
      );
      target.memberIds.push(m.id);
      target.total += m.amount;
    }
    const amountById = new Map(candidates.map((c) => [c.id, c.amount]));
    for (const b of buckets) {
      for (const memberId of b.memberIds) {
        const c = candidates.find((x) => x.id === memberId)!;
        if (c.partial) {
          await this.prisma.member.create({
            data: {
              ekubId: c.ekubId,
              name: c.name,
              address: c.address,
              phone: c.phone,
              preferredAmount: c.amount,
              quotaAmount: c.amount,
              shareGroup: c.id,
              quotaId: b.quotaId,
            },
          });
        } else {
          await this.prisma.member.update({
            where: { id: c.id },
            data: { quotaId: b.quotaId, quotaAmount: amountById.get(memberId) },
          });
        }
      }
    }
  }

  /** Randomly picks one PENDING quota as the winner. */
  async drawWinner(ekubId: number) {
    const ekub = await this.findOne(ekubId);
    if (ekub.status !== EkubStatus.ACTIVE) {
      throw new BadRequestException('Ekub is not active');
    }
    const pending = ekub.quotas.filter((q) => q.status === 'PENDING');
    if (pending.length === 0) {
      throw new BadRequestException('All quotas have already been drawn');
    }
    const chosen = pending[Math.floor(Math.random() * pending.length)];
    await this.prisma.quota.update({
      where: { id: chosen.id },
      data: { status: 'SELECTED', winnerAt: new Date() },
    });

    if (ekub.quotas.length === 1) {
      await this.prisma.ekub.update({
        where: { id: ekubId },
        data: { status: EkubStatus.COMPLETED },
      });
    }

    const updated = await this.findOne(ekubId);
    const brief = (q: any) => ({
      id: q.id,
      position: q.position,
      members: (q.members ?? []).map((m: any) => ({ name: m.name })),
    });
    this.emit({
      type: 'draw',
      ekubId,
      pending: pending.map(brief),
      winner: brief(chosen),
    });
    return updated;
  }

  /** Undoes a single draw: the selected quota returns to pending and the
   *  ekub becomes active again so another draw can run. */
  async reverseDraw(ekubId: number, quotaId: number) {
    const quota = await this.prisma.quota.findFirst({
      where: { id: quotaId, ekubId },
    });
    if (!quota) throw new NotFoundException('Quota not found');
    if (quota.status !== 'SELECTED') {
      throw new BadRequestException('Only a drawn quota can be reversed.');
    }
    await this.prisma.$transaction([
      this.prisma.quota.update({
        where: { id: quotaId },
        data: { status: 'PENDING', winnerAt: null },
      }),
      this.prisma.ekub.update({
        where: { id: ekubId },
        data: { status: EkubStatus.ACTIVE },
      }),
    ]);
    this.emit({ type: 'reverse', ekubId, pending: [], winner: null });
    return this.findOne(ekubId);
  }

  /** Clears every draw across all ekubs (all quotas pending, ekubs active). */
  async resetAllDraws() {
    await this.prisma.$transaction([
      this.prisma.quota.updateMany({
        data: { status: 'PENDING', winnerAt: null },
      }),
      this.prisma.ekub.updateMany({
        data: { status: EkubStatus.ACTIVE },
      }),
    ]);
    this.emit({ type: 'reset', ekubId: 0, pending: [], winner: null });
    return { ok: true };
  }

  async removeMember(ekubId: number, memberId: number) {
    await this.prisma.member.deleteMany({
      where: { id: memberId, ekubId },
    });
    return this.findOne(ekubId);
  }

  async updateStatus(ekubId: number, status: EkubStatus) {
    await this.prisma.ekub.update({ where: { id: ekubId }, data: { status } });
    return this.findOne(ekubId);
  }

  async delete(id: number) {
    await this.prisma.ekub.delete({ where: { id } });
    return { ok: true };
  }

  private decorate(ekub: any) {
    const cycleLabel: Record<Cycle, string> = {
      WEEKLY: 'Weekly',
      MONTHLY: 'Monthly',
      ANNUALLY: 'Annually',
    };
    const members = ekub.members ?? [];
    const quotas = ekub.quotas ?? [];
    const totalCollected = quotas.reduce(
      (s: number, q: any) =>
        s +
        (q.payments ?? []).reduce((p: number, pay: any) => p + pay.amount, 0),
      0,
    );
    const realId = (m: any) => m.shareGroup ?? m.id;
    return {
      ...ekub,
      cycleLabel: cycleLabel[ekub.cycle as Cycle],
      totalMembers: new Set(members.map(realId)).size,
      membersAssigned: new Set(
        members.filter((m: any) => m.quotaId).map(realId),
      ).size,
      drawnQuotas: quotas.filter((q: any) => q.status === 'SELECTED').length,
      totalCollected,
      totalExpected: ekub.quotaAmount * ekub.totalQuotas,
      collectionPercent:
        ekub.quotaAmount * ekub.totalQuotas > 0
          ? Math.min(
              100,
              Math.round(
                (totalCollected / (ekub.quotaAmount * ekub.totalQuotas)) * 100,
              ),
            )
          : 0,
      totalUnallocated: this.unallocatedTotal(members),
      progress:
        ekub.totalQuotas > 0
          ? Math.round(
              (quotas.filter((q: any) => q.status === 'SELECTED').length /
                ekub.totalQuotas) *
                100,
            )
          : 0,
    };
  }

  /** Sum of every person's unallocated money: their registered total
   *  (preferredAmount of the primary row) minus what is placed across all
   *  their shares. Share rows never add to the registered total. */
  private unallocatedTotal(members: any[]) {
    const hasPrimary = new Set(
      members.filter((m) => m.shareGroup == null).map((m) => m.id),
    );
    const registered = new Map<number, number>();
    const allocated = new Map<number, number>();
    for (const m of members) {
      const realId = m.shareGroup ?? m.id;
      allocated.set(
        realId,
        (allocated.get(realId) ?? 0) + (m.quotaAmount ?? 0),
      );
      if (m.shareGroup == null || !hasPrimary.has(realId)) {
        registered.set(
          realId,
          (registered.get(realId) ?? 0) + m.preferredAmount,
        );
      }
    }
    let total = 0;
    for (const [realId, pref] of registered) {
      total += Math.max(0, pref - (allocated.get(realId) ?? 0));
    }
    return total;
  }
}
