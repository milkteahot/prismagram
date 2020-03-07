import { prisma } from "../../../../generated/prisma-client";

export default{
    Query: {
        seeMember: async(_, args) => {
            const { memberName } = args;
            return prisma.member({ memberName });
        }
    }
}
