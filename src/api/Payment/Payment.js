import { prisma } from "../../../generated/prisma-client";

export default {
    Payment: {
        user: ({ id }) => prisma.payment({ id }).user(),
        product: ({ id }) => prisma.payment({ id }).product(),
        options: ({ id }) => prisma.payment({ id }).options(),
        count: ({ id }) => prisma.payment({ id }).count(),
        cart: ({ id }) => prisma.payment({ id }).cart()
    }
}