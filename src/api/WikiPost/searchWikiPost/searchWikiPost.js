import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchWikiPost: async (_, args) =>
      prisma.wikiPosts({
        where: {
          OR: [
            // { tags_some: args.term },
            { wcaption_starts_with: args.term },
            { wtitle_starts_with: args.term }
          ]
        },
        orderBy: "createdAt_DESC"
      })
  }
};
