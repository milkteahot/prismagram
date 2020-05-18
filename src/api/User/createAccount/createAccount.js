import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt";

// 비밀번호 정규식 설정 (영문, 숫자, 특수문자 조합, 8~16자리)
const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
//const userNameCheck = /^[a-zA-Z0-9._]{1,30}$/;

export default {
  Mutation: {
    createAccount: async(_, args) => {
      const { userName, nickName, email, password } = args;
      const exists = await prisma.$exists.user({ email });
      const existsUserName = await prisma.$exists.user({ userName });
      if(existsUserName) {
        // res.status(400).send("this username is already taken")
        throw Error("This userName is already taken");
      }
      if (exists) {
        // res.status(400).send("this email is already taken")
        throw Error("This email is already taken");
      }else {
        // 비밀번호 정규식 확인 
        if (passwordCheck.test(password) === false) {
            throw Error("비밀번호는 영문, 숫자, 특수문자 조합의 8~16자리여야 합니다."); 
        }
        // 유저네임 정규식 확인
        // if(userNameCheck.test(userName) === false) {
        //   throw Error("유저네임은 영문, 숫자, ._ 를 사용한 1~30자여야 합니다.")
        // }
        // 비밀번호 암호화 진행
        bcrypt.hash(password, 10, async function(err, hash) {
            await prisma.createUser({
                userName,
                nickName,
                email,
                password: hash
            });
        });
        return true;
      }
    //   await prisma.createUser({
    //     userName,
    //     email
    //   });
    //   return true;

    }
  },

  Query: {
    checkUserName: async(_, args) => {
      const { userName } = args;
      const existsUserName = await prisma.$exists.user({ userName });
      if(existsUserName) {
        return false;
      }
      return true; 
    }
  }
};
