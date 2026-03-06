// /lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () =>
  new PrismaClient({
    log: ["error"],
    errorFormat: "minimal",
  });

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientSingleton;
};

export const prisma =
  globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const db = {
  lead: {
    create: (data: any) =>
      prisma.lead.create({ data }),

    findMany: () =>
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      }),

    findById: (id: string) =>
      prisma.lead.findUnique({ where: { id } }),

    update: (id: string, data: any) =>
      prisma.lead.update({ where: { id }, data }),

    delete: (id: string) =>
      prisma.lead.delete({ where: { id } }),

    markAsSynced: (id: string, telecrmId?: string) =>
      prisma.lead.update({
        where: { id },
        data: {
          telecrmSynced: true,
          telecrmId,
          syncedAt: new Date(),
        },
      }),
  },
};
