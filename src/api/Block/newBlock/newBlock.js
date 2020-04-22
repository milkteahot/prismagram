import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        newBlock: async(_, args, {request }) => {
            isAuthenticated(request);
            const {fundingId, seatNum} = args;
            const {user} = request;
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
                seatNum
            });
            return block;
        }
    }
}