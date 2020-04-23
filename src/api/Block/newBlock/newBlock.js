import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        newBlock: async(_, args, {request }) => {
            isAuthenticated(request);
            const {fundingId, seatNum} = args;
            const {user} = request;
            var seatRow = Math.sqrt(seatNum);

            var row = new Array(seatRow);
            for(var i=0;i<row.length;i++){
                row[i] = new Array(seatRow);
            }
            for(var i=0;i<row.length;i++){
                for(var j=0;j<seatRow;j++){
                    row[j][i] = 1;
                }
            }
            var seats = row;

            const block = await prisma.createBlock({
                creator: {
                    connect: {
                        id: user.id
                    }
                },
                funding: {
                    connect: {
                        id: fundingId
                    }
                },
                seats: {
                    create: {
                        collector: user.id
                    }
                },
                seatNum: seatNum
            });
            seats.forEach(
                async seat => 
                await prisma.createSeat({
                    number: seat,
                    block: {
                        connect: {
                            id: block.id
                        }
                    },
                    collector: user.id

                })
            )
            
            return block;
        }
    }
}