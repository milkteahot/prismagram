import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editPost: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { id, caption, title, action } = args;
            const { user } = request;
            const post = await prisma.$exists.post({ id, user: {id: user.id }});
            if(post) {
                if(action === EDIT) {
                    return prisma.updatePost(
                        {data: {caption, title}, 
                        where: {id}
                        }); 
                } else if(action === DELETE) {
                    return prisma.deletePost({ id });

                }
            } else {
                throw Error("You can't do that");
            }
            
        }
    }
}