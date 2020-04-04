import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { response } from "express";
import path from 'path'

// var AWS = require('aws-sdk');
// AWS.config.credentials = new AWS.EC2MetadataCredentials({
//   httpOptions: { timeout: 6000 }
// });

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
  // region: "us-west-1"
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read-write",
    // bucket: "catcher-us-west",
    bucket: "catcher-test2",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    // contentType: multerS3.DEFAULT_CONTENT_TYPE,
    // contentDisposition: 'attachment',
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString()+extension);
    },
  }),
  limits: {fileSize: 20 * 1024 * 1024}
});

export const uploadMiddleware = upload.array("file", 10);

export const uploadController = (req, res, err) => {

    // const {file: { location }} = req;
    const location = req.files.map(v => v.location);
    // console.log("req.files: ", req.files.map(v => v.location))
    res.json({ location });  
};
