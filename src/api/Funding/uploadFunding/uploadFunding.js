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
        tags,
        postId,
        blockNum,
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
        user: { connect: { id: user.id } },
        post: { connect: { id: postId }},
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
    const existLink = args.link;
    if(existLink != null) {
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
  }

    const tagexists = args.tags;
      if(tagexists != null) {
      tags.forEach(
        async tag => 
          await prisma.createTag({
            text: tag,
            funding: {
              connect: {
                id: funding.id
              }
            }
          })
        );
      }

    const block = await prisma.createBlock({
      creator: {
        connect: {
          id: user.id
        }
      },
      funding: {
        connect: {
          id: funding.id
        }
      },
      seatNum: 1
    });

    const seat = await prisma.createSeat({
      number:1,
      block: {
        connect: {
          id: block.id
        }
      }
    })

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
