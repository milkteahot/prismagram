import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleBookmark: async(_, args, { request }) => {
            isAuthenticated(request);
            const { productId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {user: {
                        id: user.id
                    }},
                    {product: {
                        id: productId
                    }}
                ]
            };
                try{
                    const existingLike = await prisma.$exists.like(filterOptions)
                    if(existingLike){
                        await prisma.deleteManyLikes(filterOptions);
                    }else {
                        await prisma.createLike({ 
                            user: {
                            connect: {
                                id: user.id
                                }
                            },
                            product: {
                                connect: {
                                    id: productId
                                }
                            }
                        })
                    }
                    return true; 
                }catch {
                    return false;
                }
        }
    }
};