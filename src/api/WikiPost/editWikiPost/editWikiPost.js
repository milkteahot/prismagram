import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editWikiPost: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { id, wcaption, wtitle, action } = args;
            const { user } = request;
            const wikipost = await prisma.$exists.wikiPost({ id, user: {id: user.id }});
            if(wikipost) {
                if(action === EDIT) {
                    return prisma.updateWikiPost({
                        data: {wcaption, wtitle}, 
                        where: {id}
                        }); 
                } else if(action === DELETE) {
                    return prisma.deleteWikiPost({ id });

                }
            } else {
                throw Error("You can't do that");
            }
            
        }
    }
}