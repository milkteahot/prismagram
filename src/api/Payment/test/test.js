import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        test : async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.payments({
                where: {
                    user: {
                        id: user.id
                    }
                }
            })
        }
        
    }
}