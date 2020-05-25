import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const posts = await prisma
        .posts({ 
          where: { 
            id: id
          }, orderBy: "updatedAt_DESC" 
        });
      return prisma.post({ id });
    }
  }
};
