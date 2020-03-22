import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadWikiPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { wcaption, wtitle, wikifiles } = args;
      
      const wikipost = await prisma.createWikiPost({
        wcaption, 
        wtitle, 
        user: { connect: { id: user.id } }
      });  
      wikifiles.forEach(
        async wikifile =>
          await prisma.createWikiFile({
            url: wikifile,
            wikipost: {
              connect: {
                id: wikipost.id
              }
            }
          })
      );
      return wikipost;
    }
  }
};
