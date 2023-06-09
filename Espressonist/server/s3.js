// const AWS = require('aws-sdk');
// const { randomBytes } = require('crypto');
// require('dotenv').config();

// const region = 'us-east-2';
// const bucketName = 'espressonist-bucket';
// const accessKeyId = process.env.AWS_UPLOAD_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_UPLOAD_SECRET_ACCESS_KEY;

// console.log('AWS_UPLOAD_ACCESS_KEY_ID:', accessKeyId);
// console.log('AWS_UPLOAD_SECRET_ACCESS_KEY:', secretAccessKey);

// AWS.config.update({
//     region: region,
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey
// });
// console.log('AWS config updated with region and credentials');

// const s3 = new AWS.S3({
//     signatureVersion: 'v4'
// });
// console.log('S3 object created');

// async function generateUploadURL() {
//     try {
//         const rawBytes = randomBytes(16);
//         console.log('rawBytes:', rawBytes);
//         const imageName = rawBytes.toString('hex');

//         console.log('Generated image name:', imageName);

//         const params = {
//             Bucket: bucketName,
//             Key: imageName,
//             Expires: 60,
//         };

//         const uploadURL = await s3.getSignedUrlPromise('putObject', params);

//         console.log('Generated upload URL:', uploadURL);

//         return {
//             success: true,
//             uploadURL: uploadURL,
//             imageName: imageName,
//         };
//     } catch (error) {
//         console.error('Error generating upload URL:', error);
//         return {
//             success: false,
//             message: 'Error generating upload URL',
//             error: error.message,
//         };
//     }
// }

// module.exports = { generateUploadURL };

