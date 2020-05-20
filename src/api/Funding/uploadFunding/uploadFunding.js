import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadFunding: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        name,
        subtitle,
        price,
        targetAmount,
        dueDate,
        currentAmount,
        numberOfParticipants,
        mainCategory,
        subCategory,
        thumbnail,
        fundingFiles,
        text,
        link,
      } = args;
      // file과 option 없이 funding 생성
      const funding = await prisma.createFunding({
        name, 
        subtitle,
        price,
        targetAmount,
        dueDate,
        currentAmount,
        numberOfParticipants,
        mainCategory,
        subCategory,
        thumbnail,
        text,
        user: { connect: { id: user.id } }
      });
      const exists = args.fundingFiles;
      if(exists != null) {
        fundingFiles.forEach(
        async fundingFile => {
        await prisma.createFundingFile({
          url: fundingFile,
          funding: {
            connect: {
              id: funding.id
            }
          }
        });
      });
    }
      link.forEach(
        async link => {
        await prisma.createLink({
            url: link,
            funding: {
              connect: {
                id: funding.id
              }
            }
        })
    });

    //   fundingDetailFile.forEach(async fundingDetailFile => {
    //     await prisma.createfundingDetailFile({
    //       data: {
    //         fundingDetailFile,
    //         funding: {
    //           connect: {
    //             id: funding.id
    //           }
    //         }
    //       }
    //     });
    //   });
    //   console.log(funding);
      return funding
    }
  }
};
