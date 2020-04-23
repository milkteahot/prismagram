import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeBlock: (_, args) => {
            const { id } = args;
            return prisma.block({ id })
        }
    }
}