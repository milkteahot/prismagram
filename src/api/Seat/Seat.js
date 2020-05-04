import { prisma } from "../../../generated/prisma-client";

export default {
  Seat: {
    user: ({ id }) => prisma.seat({ id }).user(),
    block: ({ id }) => prisma.seat({ id }).block()
  }
};