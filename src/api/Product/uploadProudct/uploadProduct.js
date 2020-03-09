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
        productFiles
      } = args;
      // file과 option 없이 product 생성
      const product = await prisma.createProduct({
        name, 
        price,
        mainCategory,
        subCategory,
        user: { connect: { id: user.id } }
      });
      productFiles.forEach(
        async productFile => {
        await prisma.createProductFile({
          url: productFile,
          product: {
            connect: {
              id: product.id
            }
          }
        });
      });
    //   options.forEach(async option => {
    //     await prisma.createOption({
          
    //         option,
    //         product: {
    //           connect: {
    //             id: product.id
    //           }
    //         }
          
    //     })
    // });

    //   productDetailFile.forEach(async productDetailFile => {
    //     await prisma.createProductDetailFile({
    //       data: {
    //         productDetailFile,
    //         product: {
    //           connect: {
    //             id: product.id
    //           }
    //         }
    //       }
    //     });
    //   });
    //   console.log(product);
      return product
    }
  }
};
