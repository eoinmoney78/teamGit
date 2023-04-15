const AWS = require('aws-sdk');
const { randomBytes } = require('crypto');
require('dotenv').config();

AWS.config.update({ region: 'us-east-1' });

const region = 'us-east-2';
const bucketName = 'espresso-bucket';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

async function generateUploadURL() {
    try {
        const rawBytes = await randomBytes(16);
        console.log('rawBytes:', rawBytes); // added console.log
        const imageName = rawBytes.toString('hex');

        console.log('Generated image name:', imageName);

        const params = {
            Bucket: bucketName,
            Key: imageName,
            Expires: 60,
        };

        const uploadURL = await s3.getSignedUrlPromise('putObject', params);

        console.log('Generated upload URL:', uploadURL);

        return {
            success: true,
            uploadURL: uploadURL,
            imageName: imageName,
        };
    } catch (error) {
        console.error('Error generating upload URL:', error);
        return {
            success: false,
            message: 'Error generating upload URL',
            error: error.message,
        };
    }
}


module.exports = { generateUploadURL };
