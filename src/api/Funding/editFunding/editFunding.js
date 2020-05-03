import { prisma } from "../../../../generated/prisma-client";

export default {
  // funding 기본 정보 수정
  Mutation: {
    editFunding: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, name, price, mainCategory, subCategory } = args;
      const { user } = request;
      const funding = await prisma.$exists.funding({
        id,
        user: { id: user.id }
      });
      if (funding) {
        return prisma.updateFunding({
          data: {
            name,
            price,
            mainCategory,
            subCategory
          },
          where: {
            id
          }
        });
      } else {
        throw Error("You can't do that");
      }
    },
    // 판매량 수정
    editNumberOfParticipants: (_, args) => {
      const { id, pplCount } = args;
      try {
        id.map(async (item, index) => {
          await prisma.updateFunding({
            where: {
              id: item
            },
            data: {
              numberOfParticipants: pplCount[index]
            }
          });
        });
        return true;
      } catch {
        return false;
      }
    },

    // 대표이미지파일 수정
    editFundingFile: async (_, args) => {
      const { fundingFileId, fundingFile } = args;
      fundingFile.forEach(async url => {
        await prisma.updateFundingFile({
          where: {
            id: fundingFileId
          },
          data: {
            url
          }
        });
      });
      return true;
    },
    // 옵션 수정
    editOption: (_, args) => {
      const { fundingId, optionId, optionName, optionprice } = args;
      try {
        optionId.map(async (item, index) => {
          if (optionId.length > index) {
            await prisma.updateOption({
              where: {
                id: optionId[index]
              },
              data: {
                optionName: optionName,
                optionprice: optionprice
              }
            });
          } else {
            await prisma.createOption({
              optionName: optionName,
              optionprice: optionprice,
              funding: {
                connect: {
                  id: fundingId
                }
              }
            });
          }
        });
        return true;
      } catch (error){
        console.log(error);
        return false;
      }
    },
    
    
    
  }
};
