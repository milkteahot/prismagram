import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
var path = require('path');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});

// var AWS = require('aws-sdk');
// AWS.config.credentials = new AWS.EC2MetadataCredentials({
//   httpOptions: { timeout: 4000 }
// });

 //Storage multer config
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//       cb(null, `${Date.now()}_${file.originalname}`);
//   },
//   fileFilter: (req, file, cb) => {
//       const ext = path.extname(file.originalname)
//       if(ext !== '.mp4' || ext !== '.png'|| ext !== '.jpg' || ext !== '.gif') {
//           return cb(res.status(400).end('only mp4, png, jpg is allowed'), false);
//       }
//       cb(null, true)
//   }
// });

// const upload = multer({ storage: storage }).single("file");

const upload = multer({ dest: "uploads/" });
// const upload = multer({
//   storage: multerS3({
//     s3,
//     // acl: "public-read",
//     bucket: "catcher-test2",
//     metadata: function(req, file, cb) {
//       cb(null, { fieldName: file.fieldName });
//     },
//     key: function(req, file, cb) {
//       cb(null, Date.now().toString());
//     }
//   })
// });

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res, err) => {

  
  const {
    file 
  //   // file: { location }
  } = req;
  const path = req.file.path
  console.log(file);
  console.log(req.file.path);
  console.log(res.req.file.path);
  console.log(path);
  // console.log(path);
  // res.end();
  //res.json({path: "jlkjlk"});
  // res.json({ path });
  if(err) {
    return res.json({ success: false, err })
  }
  console.log(res.req.file.path)
  return res.json({ success:true, url: path })

  // res.end();
  
};
