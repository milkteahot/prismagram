import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addCommentProduct: async(_, args, {request }) => {
            isAuthenticated(request);
            const {text, productId} = args;
            const {user} = request;
            const commentproduct = await prisma.createCommentProduct({
                user: {
                    connect: {
                        id: user.id
                    }
                },
                product: {
                    connect: {
                        id: productId
                    }
                },
                text
            });
            return commentproduct;
        }
    }
}