import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        returnPayment : async (_, args, { request }) => {
            const { user } = request;
            const { funding, product, count, cart } = args; 

            if(cart === undefined) {
                try {
                    await count.map(async(item, index) => {
                        const countId = await prisma.createCount({
                            count: item
                        }); 
                        const payment = await prisma.createPayment({
                            user: {
                                connect: {
                                    id: user.id 
                                }
                            }, 
                            funding: {
                                connect: {
                                    id: funding[index]
                                }
                            }, 
                            count: {
                                connect: {
                                    id: countId.id
                                }
                            },
                        });
                        console.log(payment);
                    })
                    // return true;
                    // return payment;
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
                        const payment = await prisma.createPayment({
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
                        console.log(payment);
                        return payment;
                        // return true;
                    })
                    // return prisma.payment({ id });
                } catch (error) {
                    console.log(error);
                    return false; 
                }
            }
        }
        
    }
}