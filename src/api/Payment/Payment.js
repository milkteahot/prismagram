import { prisma } from "../../../generated/prisma-client";

export default {
    Payment: {
        user: ({ id }) => prisma.payment({ id }).user(),
        funding: ({ id }) => prisma.payment({ id }).funding(),
        options: ({ id }) => prisma.payment({ id }).options(),
        count: ({ id }) => prisma.payment({ id }).count(),
        cart: ({ id }) => prisma.payment({ id }).cart()
    }
}