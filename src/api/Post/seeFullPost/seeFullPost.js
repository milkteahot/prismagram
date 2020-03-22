import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const products = await prisma
        .products({ 
          where: { 
            user: { 
              id: user.id 
            } 
          }, orderBy: "updatedAt_DESC" 
        });
      return prisma.post({ id });
    }
  }
};
