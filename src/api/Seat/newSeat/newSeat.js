import { prisma } from "../../../../generated/prisma-client";

export default {
    Subscription: {
        newSeat: {
            subscribe: (_, args) => {
                const { blockId } = args;
                return prisma.$subscribe.seat({ 
                    AND: [
                        {mutation_in: "CREATED"},
                        { 
                            node: {
                                block: { id: blockId }
                            }
                        }
                    ]
                }).node();
            },
            resolve: payload => payload
        }
    }
}