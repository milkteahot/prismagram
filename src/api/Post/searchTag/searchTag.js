import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchTag: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
            { tags_some: args.term }
          ]
        }
      })
  }
};