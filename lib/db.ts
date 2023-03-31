import { PrismaClient } from '@prisma/client';

// DB client is already configured since it gets generated with the DB details.
export const prisma = new PrismaClient();

// Tried fixing 'Error: PrismaClient is unable to be run in the browser' with below, but I think it's a different issue.
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// export const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const db = {
  getComments: async function () {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return comments;
  },

  createComment: async function (text: string) {
    const comment = await prisma.comment.create({ data: { text } });
    return comment;
  },
};

export default db;
