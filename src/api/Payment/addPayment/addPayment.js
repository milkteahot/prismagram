import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addPayment : async (_, args, { request }) => {
            const { user } = request;
            const { product, count, cart } = args; 

            if(cart === undefined) {
                try {
                    await count.map(async(item, index) => {
                        const countId = await prisma.createCount({
                            count: item
                        }); 
                        await prisma.createPayment({
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
                            count: {
                                connect: {
                                    id: countId.id
                                }
                            }
                        });
                        // return payment;
                    })
                    return true;
                    // return prisma.payment({ id });
                } catch (error) {
                    console.log(error);
                    return false; 
                }
            } else {
                try {
                    await count.map(async(item, index) => {
                        const countId = await prisma.createCount({
                            count: item
                        }); 
                        await prisma.createPayment({
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
                            count: {
                                connect: {
                                    id: countId.id
                                }
                            },
                            cart: {
                                connect: {
                                    id: cart[index]
                                }
                            }
                        });
                        // return payment;
                        return true;
                    })
                    return prisma.payment({ id });
                } catch (error) {
                    console.log(error);
                    return false; 
                }
            }
            // return prisma.payment({ id });
        }
        
    }
}