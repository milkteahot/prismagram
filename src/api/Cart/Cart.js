import { prisma } from "../../../generated/prisma-client";

export default {
    Cart: {
        user: ({ id }) => prisma.cart({ id }).user(),
        product: ({ id }) => prisma.cart({ id }).product(),
        funding: ({ id }) => prisma.cart({ id }).funding(),
        options: ({ id }) => prisma.cart({ id }).options(),
        count: ({ id }) => prisma.cart({ id }).count()
    }
}