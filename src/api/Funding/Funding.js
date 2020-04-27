import { prisma } from "../../../generated/prisma-client";

export default {
  Funding: {
    user: ({ id }) => prisma.funding({ id }).user(),
    likes: ({ id }) => prisma.funding({ id }).likes(),
    fundingFiles: ({ id }) => prisma.funding({ id }).fundingFiles(),
    options: ({ id }) => prisma.funding({ id }).options(),
    cart: ({ id }) => prisma.funding({ id }).cart(),
    block: ({ id }) => prisma.funding({ id }).block(),
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
            funding: {
              id
            }
          }
        ]
      });
    },

    likeCount: parent =>
      prisma
        .likesConnection({
          where: { funding: { id: parent.id } }
        })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { funding: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
