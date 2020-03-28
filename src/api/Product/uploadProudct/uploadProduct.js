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
        productFiles
      } = args;
      // file과 option 없이 product 생성
      const product = await prisma.createProduct({
        name, 
        price,
        mainCategory,
        subCategory,
        thumbnail,
        user: { connect: { id: user.id } }
      });
      const exists = args.productFiles;
      if(exists != null) {
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
    }
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

      return product
    }
  }
};
