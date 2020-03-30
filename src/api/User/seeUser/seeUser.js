import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { userName } = args;
      return prisma.users({ 
        where:{userName: userName},
        orderBy: "createdAt_DESC",
        
       });
      
    },
    users: async(_, __) => {
      return prisma.users({
        orderBy: "updatedAt_DESC"
      });
    }

    
  }
};
