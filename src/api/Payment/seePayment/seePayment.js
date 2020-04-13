import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seePayment : (_, __, { request, isAuthenticated }) => {
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
    },
    Mutation: {
        seePayment: async(_, __, { request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request; 
            return await prisma.payments({
                where: {
                    user: {
                        id: user.id 
                    }
                },
                orderBy: "createdAt_DESC",
                first: 1
            })
        }
    }

}