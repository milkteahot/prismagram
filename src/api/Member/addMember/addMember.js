import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addMember: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const {memberName, files, caption} = args;
            const post = await prisma.createPost({ 
                caption,
                user: {connect: {id: user.id}} 
            });
            const member = await prisma.createMember({ 
                memberName, 
                user: {connect: {id: user.id}} 
            });
            files.forEach(
                async(file) => 
                await prisma.createFile({
                    url:file,
                    member: {
                        connect: {
                            id: post.id
                        }
                    }
                    
                })
            );
            return member;
        }
    }
}