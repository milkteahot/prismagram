import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeContract: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { id } = args;
        const { user } = request;
        
        const myContract = await prisma.$exists.contract({
            OR: [
                {creator: {
                    id: user.id
                }},
                {collector: {
                    id: user.id
                }}
            ]
        })
        if(myContract){
            return prisma.contract({id});
        }else{
            return false;
        }
    }
        
    }
    };
