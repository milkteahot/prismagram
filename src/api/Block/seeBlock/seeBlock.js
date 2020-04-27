import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeBlock: (_, args) => {
            const { id } = args;
            return prisma.block({ id })
        },

        seeMyBlock: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.blocks({
                where: {
                    creator: {
                        id: user.id
                    }
                }
            })
        },

        seeMySeat: async(_, __, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const filterOptions = {
                AND: [
                    {collectors_every: {
                        id: user.id
                    }},
                    {seat: {
                        number:2
                    }}
                ]
            };
            try{
                const existingSeat = await prisma.$exists.block(filterOptions)
                if(existingSeat){
                    return prisma.$exists.block({
                        filterOptions
                    });

                    // return await prisma.blocks({
                    //     where: {
                    //         collectors_every: {
                    //             id: user.id
                    //         }
                    //     }
                    // }) 
                }

            }catch{
                return false;

            }
            
        }
    }
}