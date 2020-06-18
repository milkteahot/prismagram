import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadProduct: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        name,
        price,
        mainCategory,
        subCategory,
        thumbnail,
        title,
        text,
        productFiles,
        options,
        targetOfSales,
        isValidated,
        postId
      } = args;
      // file과 option 없이 product 생성
      const product = await prisma.createProduct({
        name,
        price,
        mainCategory,
        subCategory,
        thumbnail,
        title,
        text,
        targetOfSales,
        isValidated,
        user: { 
          connect: { 
            id: user.id 
          } 
        },
        post: { 
          connect: {
            id: postId
          }
        }
      });
      const exists = args.productFiles;
      if (exists != null) {
        productFiles.forEach(async productFile => {
          await prisma.createProductFile({
            url: productFile,
            product: {
              connect: {
                id: product.id
              }
            }
          });
        });
      }
      options.forEach(
        async option =>
          await prisma.createOption({
            optionName: option,
            product: {
              connect: {
                id: product.id
              }
            }
          })
      );
      return product;
    }
  }
};
