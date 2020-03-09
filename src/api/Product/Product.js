import { prisma } from "../../../generated/prisma-client";

export default {
    Product: {
        user: ({id}) => prisma.product({id}).user(),
        productFiles: ({ id }) => prisma.product({ id }).productFiles(), 
        options: ({ id }) => prisma.product({ id }).options(),
        productDetailFile: ({ id }) => prisma.product({ id }).productDetailFile()
    }
}; 