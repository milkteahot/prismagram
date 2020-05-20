import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadContract: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { contentName, title, text, condition, title2, text2, fundingId } = args;
      const contract = await prisma.createContract({
        contentName,
        title,
        text,
        title2,
        text2,
        creator: {
          connect: {
            id: user.id
          }
        }
      });
      
      condition.map(
        async (item, index )=> 
          await prisma.createCondition({
            title: "제 "+(index+1)+"조",
            text: item,
            contract: {
              connect: {
                id: contract.id
              }
            },
        })
        );
      
      if(contract === null) {
        throw new Error("post is null")
      }
      return contract;
      
    }
  }
};
