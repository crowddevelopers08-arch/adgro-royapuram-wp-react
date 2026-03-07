import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  console.log('Initializing Prisma Client...');
  console.log('Database URL exists:', !!process.env.DATABASE_URL);
  
  return new PrismaClient({
    log: ["error", "warn"],
    errorFormat: "minimal",
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientSingleton;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Helper functions for lead operations
export const db = {
  lead: {
    create: async (data: any) => {
      try {
        console.log('Creating lead with data:', data);
        const cleanData = Object.fromEntries(
          Object.entries(data).filter(([_, v]) => v !== undefined)
        );
        return await prisma.lead.create({ data: cleanData });
      } catch (error) {
        console.error('Error in db.lead.create:', error);
        throw error;
      }
    },

    findMany: async (options?: { where?: any; orderBy?: any; skip?: number; take?: number }) => {
      try {
        return await prisma.lead.findMany({
          where: options?.where,
          orderBy: options?.orderBy || { createdAt: "desc" },
          skip: options?.skip,
          take: options?.take,
        });
      } catch (error) {
        console.error('Error in db.lead.findMany:', error);
        throw error;
      }
    },

    findUnique: async (options: { where: { id: string } }) =>
      prisma.lead.findUnique(options),

    findFirst: async (options: { where: any }) =>
      prisma.lead.findFirst(options),

    update: async (options: { where: { id: string }; data: any }) => {
      try {
        const cleanData = Object.fromEntries(
          Object.entries(options.data).filter(([_, v]) => v !== undefined)
        );
        return await prisma.lead.update({ 
          where: options.where, 
          data: {
            ...cleanData,
            updatedAt: new Date()
          } 
        });
      } catch (error) {
        console.error('Error in db.lead.update:', error);
        throw error;
      }
    },

    delete: async (options: { where: { id: string } }) =>
      prisma.lead.delete(options),

    count: async (options?: { where?: any }) => {
      try {
        return await prisma.lead.count(options);
      } catch (error) {
        console.error('Error in db.lead.count:', error);
        throw error;
      }
    },

    groupBy: async (options: any) =>
      prisma.lead.groupBy(options),
  },
};