import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editMember: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { id, memberName, action, avatar, mtag1, mtag2, mtag3 } = args;
            const { user } = request;
            const member = await prisma.$exists.member({ id, user: {id: user.id }});
            if(member) {
                if(action === EDIT) {
                    return prisma.updateMember(
                        {data: {memberName, avatar, mtag1, mtag2, mtag3}, 
                        where: {id}
                        }); 
                } else if(action === DELETE) {
                    return prisma.deleteMember({ id });
                }
            } else {
                throw Error("You can't do that");
            }
            
        },

        editMemberTag: async(_, args) => {
            const { memberTagId, memberTag } = args;
            memberTag.forEach(async text => {
                await prisma.updateMemberTag({
                    where: {
                        id: memberTagId
                    },
                    data: {
                        text
                    }
                });
            });
            return true;
        }
    }
}