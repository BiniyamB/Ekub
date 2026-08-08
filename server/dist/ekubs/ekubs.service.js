"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EkubsService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let EkubsService = class EkubsService {
    prisma;
    drawEvents = new rxjs_1.Subject();
    constructor(prisma) {
        this.prisma = prisma;
    }
    drawStream(ekubId) {
        return (0, rxjs_1.merge)(this.drawEvents.pipe((0, operators_1.filter)((e) => e.ekubId === 0 || e.ekubId === ekubId), (0, operators_1.map)((e) => ({
            type: 'ekub-event',
            data: JSON.stringify(e),
        }))), (0, rxjs_1.interval)(20000).pipe((0, operators_1.map)(() => ({ type: 'heartbeat', data: '{}' }))));
    }
    emit(event) {
        this.drawEvents.next(event);
    }
    async create(dto) {
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
    async findOne(id) {
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
        if (!ekub)
            throw new common_1.NotFoundException('Ekub not found');
        return this.decorate(ekub);
    }
    async paymentPlan(ekubId) {
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
        if (!ekub)
            throw new common_1.NotFoundException('Ekub not found');
        const round2 = (n) => Math.round(n * 100) / 100;
        const round1 = (n) => Math.round(n * 10) / 10;
        const realId = (m) => m.shareGroup ?? m.id;
        const paidInFull = (paid, owed) => owed <= 0 || paid >= Math.floor(owed + 0.001);
        const persons = ekub.members.filter((m) => m.shareGroup == null);
        const slots = ekub.totalQuotas || 1;
        const potOf = (fill) => round2(fill * (slots - 1));
        const roundsPlan = ekub.quotas
            .filter((q) => q.status === 'SELECTED' && q.members.length > 0)
            .map((q) => {
            const byRealId = new Map();
            for (const m of q.members) {
                const key = realId(m);
                const list = byRealId.get(key) ?? [];
                list.push(m);
                byRealId.set(key, list);
            }
            const winners = [...byRealId.values()].map((rows) => {
                const first = rows[0];
                const fill = rows.reduce((s, m) => s + (m.quotaAmount ?? m.preferredAmount), 0);
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
                    assigned: [],
                };
            });
            const winnerIds = new Set(winners.map((w) => w.realId));
            const pool = persons
                .filter((p) => !winnerIds.has(p.id))
                .map((p) => ({
                memberId: p.id,
                name: p.name,
                amount: p.preferredAmount,
            }))
                .filter((p) => p.amount > 0);
            const ordered = [...winners].sort((a, b) => b.pot - a.pot);
            for (const w of ordered) {
                let remaining = w.pot;
                while (remaining > 0.004 && pool.length > 0) {
                    let fit = -1;
                    let fitAmount = 0;
                    let smallest = 0;
                    for (let i = 0; i < pool.length; i++) {
                        if (pool[i].amount <= remaining + 0.004 &&
                            pool[i].amount > fitAmount) {
                            fit = i;
                            fitAmount = pool[i].amount;
                        }
                        if (pool[i].amount < pool[smallest].amount)
                            smallest = i;
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
            const payers = winners.flatMap((w) => w.assigned.map((a) => {
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
                    percent: a.amount > 0
                        ? round1(Math.min(100, (paid / a.amount) * 100))
                        : 100,
                    status: paidInFull(paid, a.amount)
                        ? 'PAID'
                        : paid > 0
                            ? 'PARTIAL'
                            : 'UNPAID',
                };
            }));
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
        const acc = roundsPlan.reduce((a, r) => {
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
        }, {
            totalOwed: 0,
            totalPaid: 0,
            persons: new Map(),
        });
        const personsSummary = [...acc.persons.values()]
            .map((p) => ({
            memberId: p.memberId,
            name: p.name,
            owed: round2(p.owed),
            paid: round2(p.paid),
            percent: p.owed > 0 ? round1(Math.min(100, (p.paid / p.owed) * 100)) : 100,
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
            overallPercent: acc.totalOwed > 0
                ? round1(Math.min(100, (acc.totalPaid / acc.totalOwed) * 100))
                : 0,
            paidPersons: personsSummary.filter((p) => p.status === 'PAID').length,
            partialPersons: personsSummary.filter((p) => p.status === 'PARTIAL')
                .length,
            unpaidPersons: personsSummary.filter((p) => p.status === 'UNPAID').length,
            persons: personsSummary,
        };
    }
    async registerMember(ekubId, dto) {
        const ekub = await this.prisma.ekub.findUnique({ where: { id: ekubId } });
        if (!ekub)
            throw new common_1.NotFoundException('Ekub not found');
        if (ekub.status !== client_1.EkubStatus.ACTIVE) {
            throw new common_1.BadRequestException('Ekub is not active');
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
    async updateEkub(ekubId, dto) {
        const ekub = await this.prisma.ekub.findUnique({ where: { id: ekubId } });
        if (!ekub)
            throw new common_1.NotFoundException('Ekub not found');
        if (ekub.status !== client_1.EkubStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only active ekubs can have their plan edited');
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
    async updateMember(ekubId, memberId, dto) {
        const member = await this.prisma.member.findFirst({
            where: { id: memberId, ekubId },
        });
        if (!member)
            throw new common_1.NotFoundException('Member not found');
        await this.prisma.member.update({
            where: { id: memberId },
            data: {
                name: dto.name,
                address: dto.address,
                phone: dto.phone,
                preferredAmount: dto.preferredAmount,
                quotaAmount: member.quotaAmount === member.preferredAmount
                    ? dto.preferredAmount
                    : member.quotaAmount,
            },
        });
        return this.findOne(ekubId);
    }
    async assignMemberToQuota(ekubId, memberId, dto) {
        const member = await this.prisma.member.findFirst({
            where: { id: memberId, ekubId },
        });
        if (!member)
            throw new common_1.NotFoundException('Member not found');
        const quotaId = dto.quotaId && dto.quotaId > 0 ? dto.quotaId : null;
        if (quotaId) {
            const quota = await this.prisma.quota.findFirst({
                where: { id: quotaId, ekubId },
            });
            if (!quota)
                throw new common_1.NotFoundException('Quota not found');
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
    async setQuotaMembers(ekubId, quotaId, entries) {
        const quota = await this.prisma.quota.findFirst({
            where: { id: quotaId, ekubId },
            include: { members: true },
        });
        if (!quota)
            throw new common_1.NotFoundException('Quota not found');
        const ekubMembers = await this.prisma.member.findMany({
            where: { ekubId },
        });
        const byId = new Map(ekubMembers.map((m) => [m.id, m]));
        const validIds = new Set(ekubMembers.map((m) => m.id));
        const unique = new Map();
        for (const entry of entries) {
            if (!validIds.has(entry.memberId)) {
                throw new common_1.BadRequestException(`Member #${entry.memberId} does not belong to this ekub.`);
            }
            if (entry.amount == null || entry.amount <= 0) {
                throw new common_1.BadRequestException(`Member #${entry.memberId} needs a positive amount.`);
            }
            unique.set(entry.memberId, entry.amount);
        }
        const ops = [
            this.prisma.member.updateMany({
                where: { ekubId, quotaId },
                data: { quotaId: null, quotaAmount: null },
            }),
        ];
        for (const [memberId, amount] of unique) {
            const member = byId.get(memberId);
            const realId = member.shareGroup ?? member.id;
            const comingFromOtherQuota = member.quotaId != null && member.quotaId !== quotaId;
            if (!comingFromOtherQuota) {
                ops.push(this.prisma.member.update({
                    where: { id: member.id },
                    data: { quotaId, quotaAmount: amount },
                }));
                continue;
            }
            const oldAmount = member.quotaAmount ?? member.preferredAmount;
            const remaining = oldAmount - amount;
            if (remaining > 0) {
                ops.push(this.prisma.member.update({
                    where: { id: member.id },
                    data: { quotaAmount: remaining },
                }));
                ops.push(this.prisma.member.create({
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
                }));
            }
            else {
                ops.push(this.prisma.member.update({
                    where: { id: member.id },
                    data: { quotaId, quotaAmount: amount },
                }));
            }
        }
        await this.prisma.$transaction(ops);
        const ekub = await this.findOne(ekubId);
        const updated = ekub.quotas.find((q) => q.id === quotaId);
        const total = (updated?.members ?? []).reduce((s, m) => s + (m.quotaAmount ?? m.preferredAmount), 0);
        const warnings = total === ekub.quotaAmount
            ? []
            : [
                `Quota #${updated?.position} total is ${total}, but the quota value is ${ekub.quotaAmount}.`,
            ];
        return { ekub, warnings };
    }
    async registerMembers(ekubId, dtos) {
        const ekub = await this.prisma.ekub.findUnique({ where: { id: ekubId } });
        if (!ekub)
            throw new common_1.NotFoundException('Ekub not found');
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
    async generateQuotas(ekubId) {
        const ekub = await this.prisma.ekub.findUnique({
            where: { id: ekubId },
            include: {
                quotas: { include: { members: true }, orderBy: { position: 'asc' } },
                members: true,
            },
        });
        if (!ekub)
            throw new common_1.NotFoundException('Ekub not found');
        const capacity = ekub.quotaAmount;
        const available = ekub.quotas.filter((q) => q.status !== 'SELECTED');
        const hasPrimary = new Set(ekub.members.filter((m) => m.shareGroup == null).map((m) => m.id));
        const registered = new Map();
        const allocated = new Map();
        for (const m of ekub.members) {
            const realId = m.shareGroup ?? m.id;
            allocated.set(realId, (allocated.get(realId) ?? 0) + (m.quotaAmount ?? 0));
            if (m.shareGroup == null || !hasPrimary.has(realId)) {
                registered.set(realId, (registered.get(realId) ?? 0) + m.preferredAmount);
            }
        }
        const candidates = [];
        for (const [realId, total] of registered) {
            const placed = allocated.get(realId) ?? 0;
            const unallocated = total - placed;
            if (unallocated <= 0)
                continue;
            const src = ekub.members.find((m) => m.shareGroup == null && (m.shareGroup ?? m.id) === realId) ?? ekub.members.find((m) => (m.shareGroup ?? m.id) === realId);
            if (!src)
                continue;
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
                gap: capacity -
                    q.members.reduce((s, m) => s + (m.quotaAmount ?? m.preferredAmount), 0),
            }))
                .filter((g) => g.gap > 0);
            if (short.length > 0) {
                return {
                    ekub: await this.findOne(ekubId),
                    assignedGroups: 0,
                    warnings: [
                        `Quota #${short
                            .map((g) => g.pos)
                            .join(', ')} ${short.length === 1 ? 'is' : 'are'} short by ${short.reduce((s, g) => s + g.gap, 0)} — but no member has an unallocated amount to fill it.`,
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
        const usedOf = (q) => q.members.reduce((s, m) => s + (m.quotaAmount ?? m.preferredAmount), 0);
        const warnings = [];
        const overfull = available.filter((q) => usedOf(q) > capacity);
        if (overfull.length > 0) {
            warnings.push(`Quota #${overfull
                .map((q) => q.position)
                .join(', ')} already exceed(s) the quota value and were left untouched.`);
        }
        const totalExpected = capacity * ekub.totalQuotas;
        const placed = ekub.quotas.reduce((s, q) => s +
            q.members.reduce((t, m) => t + (m.quotaAmount ?? m.preferredAmount), 0), 0);
        const totalMoney = placed + candidates.reduce((s, c) => s + c.amount, 0);
        if (totalMoney !== totalExpected) {
            warnings.push(`Total member amount (${totalMoney}) does not equal quota × slots (${totalExpected}).`);
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
    async rebalanceQuotas(ekubId) {
        const ekub = await this.prisma.ekub.findUnique({
            where: { id: ekubId },
            include: {
                quotas: { include: { members: true }, orderBy: { position: 'asc' } },
                members: true,
            },
        });
        if (!ekub)
            throw new common_1.NotFoundException('Ekub not found');
        if (ekub.quotas.some((q) => q.status === 'SELECTED')) {
            throw new common_1.BadRequestException('Cannot rebalance after a winner has already been drawn.');
        }
        if (ekub.members.length === 0) {
            throw new common_1.BadRequestException('No members to rebalance');
        }
        await this.prisma.member.updateMany({
            where: { ekubId },
            data: { quotaId: null, quotaAmount: null },
        });
        await this.prisma.member.deleteMany({
            where: { ekubId, shareGroup: { not: null } },
        });
        const persons = ekub.members.filter((m) => m.shareGroup == null);
        const candidates = persons.map((m) => ({
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
    async assignMembers(ekub, candidates, slots) {
        if (slots.length === 0) {
            throw new common_1.BadRequestException('No quota slots available to assign members to.');
        }
        const capacity = ekub.quotaAmount;
        const memberSum = candidates.reduce((s, c) => s + c.amount, 0);
        const totalGap = slots.reduce((s, sl) => s + (capacity - (sl.used ?? 0)), 0);
        const warnings = [];
        if (memberSum !== totalGap) {
            warnings.push(`Total member amount (${memberSum}) can't fill the remaining space across ${slots.length} slot(s) of exactly ${capacity}. Members were distributed evenly instead — slot totals may differ from the quota value.`);
            await this.assignEvenly(candidates, slots);
            return { assignedGroups: slots.length, warnings };
        }
        const sorted = [...candidates].sort((a, b) => b.amount - a.amount);
        const bins = slots.map((s) => ({
            quotaId: s.id,
            total: s.used ?? 0,
            memberIds: [],
        }));
        const splitPool = [];
        for (const m of sorted) {
            if (m.amount > capacity) {
                splitPool.push(m);
                continue;
            }
            let best = null;
            for (const b of bins) {
                if (b.total + m.amount <= capacity &&
                    (best === null || b.total > best.total)) {
                    best = b;
                }
            }
            if (best) {
                best.memberIds.push(m.id);
                best.total += m.amount;
            }
            else {
                splitPool.push(m);
            }
        }
        const residualOrder = bins
            .map((b, i) => ({ index: i, gap: capacity - b.total }))
            .sort((a, b) => b.gap - a.gap);
        const splitOrder = [...splitPool].sort((a, b) => b.amount - a.amount);
        const piecesByMember = new Map();
        let head = splitOrder.length > 0
            ? { ...splitOrder[0], remaining: splitOrder[0].amount, position: 0 }
            : null;
        for (const { index, gap } of residualOrder) {
            let need = gap;
            while (need > 0 && head) {
                const take = Math.min(head.remaining, need);
                if (!piecesByMember.has(head.id))
                    piecesByMember.set(head.id, []);
                piecesByMember
                    .get(head.id)
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
        const shareOf = (c, quotaId, amount) => this.prisma.member.create({
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
        const amountById = new Map(candidates.map((c) => [c.id, c.amount]));
        for (const b of bins) {
            for (const memberId of b.memberIds) {
                const c = candidates.find((x) => x.id === memberId);
                if (c.partial) {
                    await shareOf(c, b.quotaId, amountById.get(memberId));
                }
                else {
                    await this.prisma.member.update({
                        where: { id: memberId },
                        data: { quotaId: b.quotaId, quotaAmount: amountById.get(memberId) },
                    });
                }
            }
        }
        let splitCount = 0;
        for (const [memberId, pieces] of piecesByMember) {
            const c = candidates.find((x) => x.id === memberId);
            if (pieces.length <= 1) {
                if (pieces.length === 1) {
                    if (c.partial) {
                        await shareOf(c, pieces[0].quotaId, pieces[0].amount);
                    }
                    else {
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
                await this.prisma.$transaction(pieces.map((p) => shareOf(c, p.quotaId, p.amount)));
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
                }
                else {
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
            warnings.push(`Every slot is exactly ${capacity}. To keep as many members whole as possible, only ${splitCount} member(s) had to be split into shares (e.g. "Name1", "Name2").`);
        }
        return { assignedGroups: slots.length, warnings };
    }
    async assignEvenly(candidates, slots) {
        const sorted = [...candidates].sort((a, b) => b.amount - a.amount);
        const buckets = slots.map((s) => ({
            quotaId: s.id,
            total: s.used ?? 0,
            memberIds: [],
        }));
        for (const m of sorted) {
            const target = buckets.reduce((min, b) => b.total < min.total ? b : min);
            target.memberIds.push(m.id);
            target.total += m.amount;
        }
        const amountById = new Map(candidates.map((c) => [c.id, c.amount]));
        for (const b of buckets) {
            for (const memberId of b.memberIds) {
                const c = candidates.find((x) => x.id === memberId);
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
                }
                else {
                    await this.prisma.member.update({
                        where: { id: c.id },
                        data: { quotaId: b.quotaId, quotaAmount: amountById.get(memberId) },
                    });
                }
            }
        }
    }
    async drawWinner(ekubId) {
        const ekub = await this.findOne(ekubId);
        if (ekub.status !== client_1.EkubStatus.ACTIVE) {
            throw new common_1.BadRequestException('Ekub is not active');
        }
        const pending = ekub.quotas.filter((q) => q.status === 'PENDING');
        if (pending.length === 0) {
            throw new common_1.BadRequestException('All quotas have already been drawn');
        }
        const chosen = pending[Math.floor(Math.random() * pending.length)];
        await this.prisma.quota.update({
            where: { id: chosen.id },
            data: { status: 'SELECTED', winnerAt: new Date() },
        });
        if (ekub.quotas.length === 1) {
            await this.prisma.ekub.update({
                where: { id: ekubId },
                data: { status: client_1.EkubStatus.COMPLETED },
            });
        }
        const updated = await this.findOne(ekubId);
        const brief = (q) => ({
            id: q.id,
            position: q.position,
            members: (q.members ?? []).map((m) => ({ name: m.name })),
        });
        this.emit({
            type: 'draw',
            ekubId,
            pending: pending.map(brief),
            winner: brief(chosen),
        });
        return updated;
    }
    async reverseDraw(ekubId, quotaId) {
        const quota = await this.prisma.quota.findFirst({
            where: { id: quotaId, ekubId },
        });
        if (!quota)
            throw new common_1.NotFoundException('Quota not found');
        if (quota.status !== 'SELECTED') {
            throw new common_1.BadRequestException('Only a drawn quota can be reversed.');
        }
        await this.prisma.$transaction([
            this.prisma.quota.update({
                where: { id: quotaId },
                data: { status: 'PENDING', winnerAt: null },
            }),
            this.prisma.ekub.update({
                where: { id: ekubId },
                data: { status: client_1.EkubStatus.ACTIVE },
            }),
        ]);
        this.emit({ type: 'reverse', ekubId, pending: [], winner: null });
        return this.findOne(ekubId);
    }
    async resetAllDraws() {
        await this.prisma.$transaction([
            this.prisma.quota.updateMany({
                data: { status: 'PENDING', winnerAt: null },
            }),
            this.prisma.ekub.updateMany({
                data: { status: client_1.EkubStatus.ACTIVE },
            }),
        ]);
        this.emit({ type: 'reset', ekubId: 0, pending: [], winner: null });
        return { ok: true };
    }
    async removeMember(ekubId, memberId) {
        await this.prisma.member.deleteMany({
            where: { id: memberId, ekubId },
        });
        return this.findOne(ekubId);
    }
    async updateStatus(ekubId, status) {
        await this.prisma.ekub.update({ where: { id: ekubId }, data: { status } });
        return this.findOne(ekubId);
    }
    async delete(id) {
        await this.prisma.ekub.delete({ where: { id } });
        return { ok: true };
    }
    decorate(ekub) {
        const cycleLabel = {
            WEEKLY: 'Weekly',
            MONTHLY: 'Monthly',
            ANNUALLY: 'Annually',
        };
        const members = ekub.members ?? [];
        const quotas = ekub.quotas ?? [];
        const totalCollected = quotas.reduce((s, q) => s +
            (q.payments ?? []).reduce((p, pay) => p + pay.amount, 0), 0);
        const realId = (m) => m.shareGroup ?? m.id;
        return {
            ...ekub,
            cycleLabel: cycleLabel[ekub.cycle],
            totalMembers: new Set(members.map(realId)).size,
            membersAssigned: new Set(members.filter((m) => m.quotaId).map(realId)).size,
            drawnQuotas: quotas.filter((q) => q.status === 'SELECTED').length,
            totalCollected,
            totalExpected: ekub.quotaAmount * ekub.totalQuotas,
            collectionPercent: ekub.quotaAmount * ekub.totalQuotas > 0
                ? Math.min(100, Math.round((totalCollected / (ekub.quotaAmount * ekub.totalQuotas)) * 100))
                : 0,
            totalUnallocated: this.unallocatedTotal(members),
            progress: ekub.totalQuotas > 0
                ? Math.round((quotas.filter((q) => q.status === 'SELECTED').length /
                    ekub.totalQuotas) *
                    100)
                : 0,
        };
    }
    unallocatedTotal(members) {
        const hasPrimary = new Set(members.filter((m) => m.shareGroup == null).map((m) => m.id));
        const registered = new Map();
        const allocated = new Map();
        for (const m of members) {
            const realId = m.shareGroup ?? m.id;
            allocated.set(realId, (allocated.get(realId) ?? 0) + (m.quotaAmount ?? 0));
            if (m.shareGroup == null || !hasPrimary.has(realId)) {
                registered.set(realId, (registered.get(realId) ?? 0) + m.preferredAmount);
            }
        }
        let total = 0;
        for (const [realId, pref] of registered) {
            total += Math.max(0, pref - (allocated.get(realId) ?? 0));
        }
        return total;
    }
};
exports.EkubsService = EkubsService;
exports.EkubsService = EkubsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EkubsService);
//# sourceMappingURL=ekubs.service.js.map