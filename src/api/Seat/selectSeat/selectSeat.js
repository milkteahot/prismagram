import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

// import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        selectSeat: async(_, args, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            const { id } = args;
            // let block = await prisma.block({ id: blockId});
            
            // if(!block){
            //     throw Error("block not found");
            // }
            const filterOptions = { 
                AND: [
                    // {block: {
                    //     id: blockId
                    // }},
                    {seat: {
                        id: id
                    }},
                    {number: 2}
                ]
                
            };
            try {
                const selectedSeat = await prisma.$exists.seat(filterOptions)
                if(selectedSeat){
                    throw Error("Already taken")
                }else{
                    await prisma.updateSeat({
                        where: {
                            id: id
                        },
                        data: {
                            collector: {
                                connect: {
                                    id: user.id
                                }
                            },
                            number: 2,
    
                        }
                        
                    })
                }
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
}