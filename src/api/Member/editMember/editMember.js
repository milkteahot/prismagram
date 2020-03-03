import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editMember: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { id, memberName, action } = args;
            const { user } = request;
            const member = await prisma.$exists.member({ id, user: {id: user.id }});
            if(member) {
                if(action === EDIT) {
                    return prisma.updateMember(
                        {data: {memberName}, 
                        where: {id}
                        }); 
                } else if(action === DELETE) {
                    return prisma.deleteMember({ id });
                }
            } else {
                throw Error("You can't do that");
            }
            
        }
    }
}