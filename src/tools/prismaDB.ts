import { PrismaClient } from 'generated/prisma';

declare const globalThis: {
  prismaGlobal: PrismaClient
} & typeof global

const prisma = globalThis.prismaGlobal ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}

export default prisma
