import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchWikiPost: async (_, args) =>
      prisma.wikiposts({
        where: {
          OR: [
            { tags_some: args.term },
            { caption_starts_with: args.term },
            { title_starts_with: args.term }
          ]
        }
      })
  }
};
