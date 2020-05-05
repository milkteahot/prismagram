import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        selectColor: async(_, args, {request }) => {
            isAuthenticated(request);
            const { seatValue, blockId, color } = args;
            const {user} = request;

            const blockSeat = await prisma.seats({
                where: {
                    block:{
                        id: blockId
                    }
                }
            })
            const blockSeatId = blockSeat.map(item=>item.id)
            // console.log(blockSeat) //seat 정보
            // console.log(blockSeatId) //undefined
            seatValue.map(async (item, index) => {
                    await prisma.updateManySeats({
                        where: {
                            id:blockSeatId[item]
                        },
                        data: {
                            color: color
                        }
                    })
                    
            })
            // var arr = new Array();
            // seatValue.map(async (item, index) => {
            //     await prisma.seats({

            //     })
            // })

            // const blockSeatSelected = await prisma.seats({
            //     where: {
            //         AND: [
            //             {block: {id:blockId}},
            //             {number:2}
            //         ]
            //     }
            // })
            // const blockSeatSelectedId = blockSeatSelected.map(item=>item.id)
            // console.log(blockSeatSelected)
            // console.log(blockSeatSelectedId)
            // blockSeatSelectedId.map(async(item, index) => {
            //     await prisma.updateSeat({
            //         where: {
            //             id:item
            //         },
            //         data: {
            //             user: user.id,
            //         }
            //     })

            // })
            
            // prisma.updateSeat({
            //     where: {
            //         id: blockSeatId
            //     },
            //     data: {
            //         user: {
            //             id: user.id
            //         }
            //     }
            // })
            const block = await prisma.block({id:blockId})
            return block;
        }
    }
}