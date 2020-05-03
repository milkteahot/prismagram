import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        getSeatValue: async(_, args, {request }) => {
            isAuthenticated(request);
            const { seatValue, seatNum, blockId } = args;
            const {user} = request;

            //seatNum 크기만큼의 빈 배열 만들기
            var seatArr = new Array(seatNum);
            for(var i=0;i<seatArr.length;i++){
                seatArr[i] = new Array(seatNum);
            }
            /*
            //전체seat크기만큼 배열과 입력받은 인덱스값 비교
            for(var i=0;i<seatArr.length;i++){

                for(var j=0;j<seatValue.length;)
                    if(seatArr[i] == seatValue[j]){
                        prisma.updateSeat({
                            where: {
                                id: seatArr
                            },
                            data: {
                                number:2
                            }
                        })
                        j++;
                    }
            }
*/
            const seatAll = {
                AND: [
                    {block: {
                        id: blockId
                    }},
                ]
            }
            const blockSeat = await prisma.seats(seatAll)
            const blockSeatId = blockSeat.id
            console.log(blockSeat) //true
            console.log(blockSeatId) //undefined
            seatValue.map(async (item, index) => {
                // var j=0;
                // if(item == seatValue[j]){
                    await prisma.updateManySeats({
                        where: {
                            id:blockSeatId[item]
                        },
                        data: {
                            number: 2
                        }
                    })
                    // j++;
                // }
            })

            

            /* var seatRow = Math.sqrt(seatNum);

            var row = new Array(seatRow);
            for(var i=0;i<row.length;i++){
                row[i] = new Array(seatRow);
            }
            // for(var i=0;i<row.length;i++){
            //     for(var j=0;j<seatRow;j++){
            //         row[j][i] = 1;
            //     }
            // }
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
                seatNum: seatNum
            });
            // seats.forEach(
            //     async seat =>
            
            for(var i=0;i<seatRow;i++){
                seats.forEach(
                async seat =>
                await prisma.createSeat({
                    number: 1,
                    block: {
                        connect: {
                            id: block.id
                        }
                    }

                })
              )
            } */
            return true;
        }
    }
}