import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt";

// 비밀번호 정규식 설정 (영문, 숫자, 특수문자 조합, 8~16자리)
const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;

export default {
  Mutation: {
    editPassword: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { password } = args;
        // 비밀번호 정규식 확인 
        if (passwordCheck.test(password) === false) {
            throw Error("비밀번호는 영문, 숫자, 특수문자 조합의 8~16자리여야 합니다."); 
        }
        // 비밀번호 암호화 진행
        bcrypt.hash(password, 10, async function(err, hash) {
            await prisma.updateUser({
                where: {id: user.id},
                data: {password: hash}
            });
        });
        return true;
      } 
    }
};
