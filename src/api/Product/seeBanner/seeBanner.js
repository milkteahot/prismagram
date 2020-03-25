import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeBanner: async(_, __) => {
      return prisma.adminFiles();
    } 
  }
};
