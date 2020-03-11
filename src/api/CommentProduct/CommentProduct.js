import { prisma } from "../../../generated/prisma-client";

export default {
  CommentProduct: {
    user: ({ id }) => prisma.commentProduct({ id }).user(),
    product: ({ id }) => prisma.commentProduct({ id }).product()
  }
};