import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? 'file:./dev.db',
  }),
});

async function main() {
  const existing = await prisma.admin.findUnique({
    where: { username: 'admin' },
  });
  if (!existing) {
    await prisma.admin.create({
      data: {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        name: 'Ekub Admin',
      },
    });
    console.log('✅ Admin created: admin / admin123');
  } else {
    console.log('ℹ️  Admin already exists, skipping');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

