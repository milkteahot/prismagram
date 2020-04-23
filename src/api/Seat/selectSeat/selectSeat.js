import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

// import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        selectSeat: async(_, args, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            const { blockId } = args;
            // let block = await prisma.block({ id: blockId});
            
            // if(!block){
            //     throw Error("block not found");
            // }
            const filterOptions = { 
                AND: [
                    {block: {
                        id: blockId
                    }}
                ]
                
            };
            try {
                const selectedSeat = await prisma.$exists.seat(filterOptions)
                if(selectedSeat){
                    throw Error("Already taken")
                }else{
                    await prisma.updateSeat({
                        collector: {
                            connect: {
                                id: user.id
                            }
                        },
                        block: {
                            connect: {
                                id: blockId
                            }
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