import { prisma } from "../../../generated/prisma-client";

export default {
  Block: {
    creator: ({ id }) => prisma.block({ id }).creator(),
    collectors: ({ id }) => prisma.block({ id }).collectors(),
    funding: ({ id }) => prisma.block({ id }).funding(),
    seats: ({ id }) => prisma.block({ id }).seats(),
  }
};