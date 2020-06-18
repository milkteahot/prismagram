import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        id,
        caption,
        title,
        action,
        mainCategory,
        subCategory,
        isValidated
      } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            data: { caption, title, mainCategory, subCategory, isValidated },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't do that");
      }
    },
    editTag: (_, args) => {
      const { postId, tagId, text } = args;
      try {
        text.map(async (item, index) => {
          if (tagId !== undefined) {
            await prisma.updateTag({
              where: {
                id: tagId[index]
              },
              data: {
                text: item
              }
            });
          } else {
            await prisma.createTag({
              text: item,
              post: {
                connect: {
                  id: postId
                }
              }
            });
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
