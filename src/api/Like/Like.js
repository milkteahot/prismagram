import { prisma } from "../../../generated/prisma-client";

export default {
  Like: {
    post: ({ id }) => prisma.like({ id }).post(),
    product: ({ id }) => prisma.like({ id }).product(),
    user: ({ id }) => prisma.like({ id }).user()
  }
};