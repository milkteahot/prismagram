import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchFunding: async (_, args) =>
      prisma.fundings({
        where: {
          OR: [
            { text_contains: args.term },
            { name_contains: args.term }
          ]
        },
        orderBy: "createdAt_DESC"
      })
  }
};
