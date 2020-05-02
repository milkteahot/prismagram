import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendAccount: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { bank, account } = args;
      const { user } = request;
      const newAccount = await prisma.createAccount({
        bank,
        account,
        user: {
          connect: {
            id: user.id
          }
        },
        // where: { id: user.id },
        // data: { 
        //   bank, 
        //   account 
        // }
      });
      return newAccount;
    }
  }
};
