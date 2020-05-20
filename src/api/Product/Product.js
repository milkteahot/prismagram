import { prisma } from "../../../generated/prisma-client";

export default {
  Product: {
    user: ({ id }) => prisma.product({ id }).user(),
    likes: ({ id }) => prisma.product({ id }).likes(),
    productFiles: ({ id }) => prisma.product({ id }).productFiles(),
    options: ({ id }) => prisma.product({ id }).options(),
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            product: {
              id
            }
          }
        ]
      });
    },

    likeCount: parent =>
      prisma
        .likesConnection({
          where: { product: { id: parent.id } }
        })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { product: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
