import { prisma } from "../../../generated/prisma-client";

export default {
  Contract: {
    creator: ({ id }) => prisma.contract({ id }).creator(),
    funding: ({ id }) => prisma.contract({ id }).funding(),
    condition: ({ id }) => prisma.contract({ id }).condition(),
    collector: ({ id }) => prisma.contract({ id }).collector()
  }
};
