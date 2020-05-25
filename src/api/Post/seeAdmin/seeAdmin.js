import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeAdmin: async(_, __) => {
      return prisma.adminFiles();
    } 
  }
};
