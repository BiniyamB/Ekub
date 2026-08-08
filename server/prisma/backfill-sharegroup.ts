import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? 'file:./dev.db',
    }),
  });

  const ekubs = await prisma.ekub.findMany({ include: { members: true } });

  let fixed = 0;
  for (const ekub of ekubs) {
    const groups = new Map<string, typeof ekub.members>();
    for (const m of ekub.members) {
      const match = m.name.match(/^(.+?)(\d+)$/);
      if (!match) continue;
      const base = match[1];
      if (!groups.has(base)) groups.set(base, []);
      groups.get(base)!.push(m);
    }
    for (const [base, rows] of groups) {
      const hasBase = ekub.members.some((m) => m.name === base);
      if (rows.length < 2 && !hasBase) continue;
      const sorted = [...rows].sort(
        (a, b) => parseInt(a.name.slice(base.length), 10) - parseInt(b.name.slice(base.length), 10),
      );
      const canonical = sorted[0];
      for (const row of rows) {
        if (row.id !== canonical.id && row.shareGroup == null) {
          await prisma.member.update({
            where: { id: row.id },
            data: { shareGroup: canonical.id },
          });
          fixed += 1;
        }
      }
    }
  }

  console.log(`Backfilled shareGroup on ${fixed} share rows`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
