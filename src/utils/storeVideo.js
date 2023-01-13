const multer = require("multer");
const path = require('path');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })



// const videoStorage = multer.diskStorage({
//     destination: 'videos', // Destination to store video 
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + Date.now() 
//          + path.extname(file.originalname))
//     }
// });


//video upload function
const videoUpload = multer({
    // storage: videoStorage,
    limits: {
    fileSize: 50000000 // 10000000 Bytes = 50 MB
    },
    fileFilter(req, file, cb) {
        // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
        return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
}
})

const uploadToS3 = async (fileData) =>{

    console.log("FILEDATA", fileData);


  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileData.fieldname}.mp4`,
    Body: fileData.buffer,
  }

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data.Location);
    // resolve(data.Location)
  })
    
}


module.exports={videoUpload,uploadToS3}