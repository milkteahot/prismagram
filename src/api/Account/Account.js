import { prisma } from "../../../generated/prisma-client";

export default {
  Account: {
    user: ({ id }) => prisma.account({ id }).user(),
    
    
  }
};
