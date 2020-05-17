import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchTag: async (_, args) =>
      prisma.fundings({
        where: {
          tags_some: {
            text_contains: args.term
          }
        }

        // where: {
        //   OR: [
        //     { tags_some: args.term }
        //   ]
        // }
      })
  }
};