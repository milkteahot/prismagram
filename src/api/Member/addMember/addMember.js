import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addMember: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const {memberName, files} = args;
            const member = await prisma.createMember({ 
                memberName, 
                user: {connect: {id: user.id}} 
            });
            files.forEach(
                async(file) => 
                await prisma.createFile({
                    url:file
                    
                })
            );
            return member;
        }
    }
}