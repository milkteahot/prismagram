import { prisma } from "../../../../generated/prisma-client";

export default {
  // product 기본 정보 수정
  Mutation: {
    editProduct: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        id,
        name,
        price,
        mainCategory,
        subCategory,
        thumbnail,
        title,
        text,
        isValidated,
      } = args;
      const { user } = request;
      const product = await prisma.$exists.product({
        id,
        user: { id: user.id }
      });
      if (product) {
        return prisma.updateProduct({
          data: {
            name,
            price,
            mainCategory,
            subCategory,
            thumbnail,
            title,
            text,
            isValidated,
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
    editNumberOfSales: (_, args) => {
      const { id, saleCount } = args;
      try {
        id.map(async (item, index) => {
          await prisma.updateProduct({
            where: {
              id: item
            },
            data: {
              numberOfSales: saleCount[index]
            }
          });
        });
        return true;
      } catch {
        return false;
      }
    },

    // 대표이미지파일 수정
    editProductFile: async (_, args) => {
      const { productFileId, productFile } = args;
      productFile.forEach(async url => {
        await prisma.updateProductFile({
          where: {
            id: productFileId
          },
          data: {
            url
          }
        });
      });
      return true;
    }
    // 옵션 수정
    /*
    editOption: (_, args) => {
      const { productId, optionId, optionName, optionPrice } = args;
      try {
        optionName.map(async (item, index) => {
          if (optionId.length > index) {
            await prisma.updateOption({
              where: {
                id: optionId[index]
              },
              data: {
                optionName: item,
                optionprice: optionPrice
              }
            });
          } else {
            await prisma.createOption({
              optionName: item,
              optionprice: optionPrice,
              product: {
                connect: {
                  id: productId
                }
              }
            });
          }
        });
        return true;
      } catch {
        return false;
      }
    }
    */
  }
};
