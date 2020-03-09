import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        uploadProduct: async (_, args, { request, isAuthenticated}) => {
            isAuthenticated(request); 
            const { name,
                    price, 
                    mainCategory, 
                    subCategory, 
                    productFiles, 
                    options,
                    productDetailFiles
                } = args; 
            // file과 option 없이 product 생성 
            const product = await prisma.createProduct({ name, price, mainCategory, subCategory }); 
            productFiles.forEach(async file => {
                await prisma.createProductFile({
                    url: file, 
                    product: {
                        connect: {
                            id: product.id
                        }
                    }
                })
            }); 
            options.forEach(async option => {
                await prisma.createOption({
                    option, 
                    product: {
                        connect: {
                            id: product.id
                        }
                    }
                })
            }); 
            
            
            productDetailFiles.forEach(async productDetailFile => {
                await prisma.createProductDetailFile({
                    productDetailFile, 
                    product: {
                        connect: {
                            id: product.id 
                        }
                    }
                })
            }); 
            return product
        }
    }
}