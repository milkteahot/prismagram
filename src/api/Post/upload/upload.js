import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files, title, thumbnail, tags } = args;
      const post = await prisma.createPost({
        caption,
        title,
        thumbnail,
        user: { connect: { id: user.id } }
      });
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id
              }
            }
          })
      );
      tags.forEach(
        async tag => 
          await prisma.createTag({
            text: tag,
            post: {
              connect: {
                id: post.id
              }
            }
        })
      );
      return post;
    }
  }
};
