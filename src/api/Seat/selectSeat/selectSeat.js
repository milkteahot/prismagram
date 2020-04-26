import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

// import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        selectSeat: async(_, args, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            const { seatId } = args;
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
                        id: seatId
                    }},
                    {number: 2}
                ]
                
            };
            try {
                const selectedSeat = await prisma.$exists.seat(filterOptions)
                if(selectedSeat){
                    throw Error("Already taken")
                }else{
                    try{
                        seatId.map(async (item, index) => {
                            await prisma.updateManySeats({
                                where: {
                                    id: item
                                },
                                data: {
                                    // collector: {
                                    //     connect: [{
                                    //         id: user.id
                                    //     }]
                                    // },
                                    number: 2,
            
                                } 
                                
                            })
                        }
                            )

                    }catch{
                        return false;
                    }
                }
                return true;
            } catch(e) {
                console.log(e);
                return false;
            }
        }
    }
}