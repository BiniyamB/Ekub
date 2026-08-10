import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL ?? '',
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

