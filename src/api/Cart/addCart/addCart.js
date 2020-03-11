import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addCart: async (_, args, {request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { product, optionId, count } = args;
            try {
                await count.map(async(item, index) => {
                    const countId = await prisma.createCount ({
                        count: item
                    });
                    await prisma.createCart({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        product: {
                            connect: {
                                id: product[index]
                            }
                        },
                        options: {
                            connect: {
                                id: optionId[index]
                            }
                        },
                        count: {
                            connect: {
                                id: countId.id
                            }
                        }
                    })
                })
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    }
}