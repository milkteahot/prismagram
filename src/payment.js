import { prisma } from "../generated/prisma-client";

// app.use(bodyParser.json());

export const paymentController =  async(req, res) => {
    try {
        const { imp_uid, merchant_uid } = req.body;

        // access token 발급받기
        const getToken = await axios({
            url: "https://api.iamport.kr/users/getToken",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
                imp_key: process.env.IMP_KEY,
                imp_secret: process.env.IMP_SECRET
            }
        });

        //인증토큰
        const { access_token } = getToken.data.response;

        // imp_uid 로 아임포트서버에서 결제정보 조회
        const getPaymentData = await axios({
            url: "\`https://api.iamport.kr/payments/\${imp_uid}\`", //imp_uid
            method: "get",
            headers: { "Authorization": access_token }
        });
        const paymentData = getPaymentData.data.response;

        //DB에서 결제되어야 하는 금액 조회
        const order = await prisma.payments({
            where: {
                user: {
                    id: user.id
                }
            },
            paymentdata: paymentData.merchant_uid //모델 수정하기
        });
        const amountToBePaid = order.amount;

        //결제 검증
        const { amount, status } = paymentData;
        if(amount === amountToBePaid) {
            await prisma.updatePayment({
                where: {
                    user: {
                        id: user.id
                    }
                },
                data: {
                    merchant_uid,
                    paymentData
                }
            });
            switch (status) {
                case "paid": // 결제 완료
                    res.send({ status: "success", message: "일반 결제 성공" });
                    break;
            }
        } else {
            throw { stats: "forgery", message: "위조된 결제시도" };
        }
    }catch(e) {
        res.status(400).send(e);
    }
};