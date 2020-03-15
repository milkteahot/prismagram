import { prisma } from "../../../generated/prisma-client";

export default {
  WikiPost: {
    user: ({ id }) => prisma.wikipost({ id }).user(),
    wikicomments: ({ id }) => prisma.wikipost({ id }).wikicomments(),
    likes: ({ id }) => prisma.wikipost({ id }).likes(),
    wikifiles: ({ id }) => prisma.wikipost({ id }).wikifiles(),
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
            wikipost: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { wikipost: { id: parent.id } }
        })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { wikipost: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
