import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        orderBy: "createdAt_DESC"
      });
    },
    // postsOffsetPagination: async (root, {first, after}, ctx, info) => {
    //   const posts = await prisma.posts({
    //     orderBy: "createdAt_DESC",
    //     first: 4
    //   })
    //   const index = posts.map(m => m.id).indexOf(after) + 1
    //   return posts.slice(index, index + 1)
    // }
  },
  Query: {
    seeFeedAll: async(_, args) => {
      const { id, first, skip, after } = args;
      
      if( id !== undefined) {
        // const index = await prisma.posts.map(m => m.id).indexOf(skip)+1
        const posts = await prisma.posts({ 
          where: {id},
          orderBy: "createdAt_DESC",
          first,
          skip
        })
        // .slice(index, index+1);
        return posts;
      }
      
      return prisma.posts({
        orderBy: "createdAt_DESC",
        first,
        skip
      })
    }
  }
};
