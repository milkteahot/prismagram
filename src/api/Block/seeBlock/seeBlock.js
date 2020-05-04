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
            const collection = await prisma.block({
                collectors: user.id
            }).seats();

            return prisma.blocks({
                where: {
                    seats_every: [...collection.map(seat=>seat.id)]
                },
                orderBy: "createdAt_DESC"
            })
            /*
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
                const mySeats = await prisma.block(filterOptions)
                //const mySeat = mySeat.map(item=>item.id)
                console.log(mySeats)
                // console.log(mySeat)
                const block = await prisma.block({
                    where: {
                        id: mySeats
                    }
                })
                const blocks = block.map(m=>m.id)
                return blocks;

                    // return await prisma.blocks({
                    //     where: {
                    //         collectors_every: {
                    //             id: user.id
                    //         }
                    //     }
                    // }) 
                

            }catch{
                return false;

            }
            
        }*/
        }
    }
}