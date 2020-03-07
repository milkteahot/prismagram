import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addMember: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const {memberName, files, mtag1, mtag2, mtag3} = args;
            const member = await prisma.createMember({ 
                memberName, 
                mtag1,
                mtag2,
                mtag3,
                user: {connect: {id: user.id}} 
            });
            files.forEach(
                async(file) => 
                await prisma.createFile({
                    url:file,
                    member: {
                        connect: {
                            id: member.id
                        }
                    }
                    
                })
            );
            return member;
        }
    }
}