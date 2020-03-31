import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});

// var AWS = require('aws-sdk');
// AWS.config.credentials = new AWS.EC2MetadataCredentials({
//   httpOptions: { timeout: 4000 }
// });
 
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

export const uploadController = (req, res) => {
  const {
    file
    // : { path }
    // file: { location }
  } = req;
  console.log(file);
  // res.end();
  //res.json({path: "jlkjlk"});
  // res.json({ path });
  res.end();
  
};
