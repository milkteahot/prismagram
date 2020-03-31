import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { response } from "express";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "catcher-test2",
    // metadata: function(req, file, cb) {
    //   cb(null, { fieldName: file.fieldName });
    // },
    key: function(req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString());
    }
  }),
  limits: {fileSize: 5 * 1024 * 1024}
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res, err) => {

  try{
    const {file: { location }} = req;
    // console.log("req.file: ", req.file)
    res.json({ location });  
  } catch (err) {
    console.log(err);
    response(res, 500, "이미지 업로드중 서버 에러")
  }
  
};
