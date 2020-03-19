import { prisma } from "../../../../generated/prisma-client";
import Member from "../Member";

export default{
    Query: {
        seeMyUniverse: async(_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return await prisma.members({ 
                where: {
                    user: { 
                        userName: user.userName
                    }
                },
                orderBy: "createdAt_DESC"
             });
        }
    }
};
