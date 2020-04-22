import { prisma } from "../../../generated/prisma-client";

export default {
  Block: {
    creator: ({ id }) => prisma.block({ id }).user(),
    funding: ({ id }) => prisma.block({ id }).funding()
  }
};