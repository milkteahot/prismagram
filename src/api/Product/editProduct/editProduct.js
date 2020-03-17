import { prisma } from "../../../../generated/prisma-client";

export default {
  // product 기본 정보 수정
  Mutation: {
    editProduct: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, name, price, mainCategory, subCategory } = args;
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
    },
    // 옵션 수정
    editOption: (_, args) => {
      const { productId, optionId, optionValue } = args;
      try {
        optionValue.map(async (item, index) => {
          if (optionId.length > index) {
            await prisma.updateOption({
              where: {
                id: optionId[index]
              },
              data: {
                option: item
              }
            });
          } else {
            await prisma.createOption({
              option: item,
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
    },
    
    // 상품디테일 파일 수정
    editProductDetailFile: (_, args) => {
      const { id, productDetailFile } = args;
      return prisma.updateProductDetailFile({
        data: {
          productDetailFile
        },
        where: {
          id
        }
      });
    },
    
  }
};
