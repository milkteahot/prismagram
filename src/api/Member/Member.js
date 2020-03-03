import { prisma } from "../../../generated/prisma-client";

export default {
  Member: {
    files: ({ id }) => prisma.member({ id }).files(),
    user: ({ id }) => prisma.member({ id }).user()
  }
};
