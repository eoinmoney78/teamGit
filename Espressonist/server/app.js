// * Dependencies
require('dotenv').config();

const express = require('express');
const app = express();
const cloudinary = require('./cloudinaryConfig');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const PORT = process.env.PORT || 5001;

// * Imports
const { db } = require('./db');

// * Middleware
// added to allow us to accept JSON data from the body of our client.
app.use(express.json());
// Helps with sharing connection to front end.
app.use(cors());
const { coffeeController, userController } = require('./controllers');

app.use('/coffee', coffeeController);
app.use('/user', userController);

// Route handler for image uploads
// app.post('/image/upload', upload.single('image'), (req, res) => {
//     // req.file is the 'image' file
//     // req.body will hold the text fields, if there were any

//     console.log('Request body:', req.body);
//     console.log('Request file:', req.file);

//     const coffeeData = req.body;

//     // Upload the image to Cloudinary
//     cloudinary.uploader.upload(req.file.path, (error, result) => {
//         if (error) {
//             console.error('Upload error:', error);
//             res.status(500).json({ message: 'Error uploading image to Cloudinary.' });
//         } else {
//             console.log('Upload result:', result);
//             // Update the img field with the secure_url from the Cloudinary response
//             coffeeData.img = result.secure_url;
//             console.log('Updated coffeeData with img:', coffeeData);

//             // Save the coffeeData to your database
//             // (You should replace this with your actual database save logic)
//             res.status(200).json({ message: 'Data received and saved.' });
//         }
//     });
// });

app.post('/image/upload', upload.single('image'), (req, res) => {
    // req.file is the 'image' file
    // req.body will hold the text fields, if there were any

    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const coffeeData = req.body;

    // Upload the image to Cloudinary
    cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
            console.error('Upload error:', error);
            res.status(500).json({ message: 'Error uploading image to Cloudinary.' });
        } else {
            console.log('Upload result:', result);
            // Update the img field with the secure_url from the Cloudinary response
            coffeeData.img = result.secure_url;
            console.log('Updated coffeeData with img:', coffeeData);

            // Save the coffeeData to your database
            // (You should replace this with your actual database save logic)
            res.status(200).json({ message: 'Data received and saved.' });
        }
    });
});







// * Connection
const server = async () => {
    db();
    // Listening to port and displaying on our console.
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
};
server();




//* Routes







// require('dotenv').config();

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const PORT = process.env.PORT || 5001;

// const multer = require('multer');
// const AWS = require('aws-sdk');

// // Configure AWS S3
// const S3_BUCKET = process.env.S3_BUCKET;
// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// // Configure multer for handling file uploads
// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
// });

// const { db } = require('./db');

// app.use(express.json());
// app.use(cors());

// const { coffeeController, userController } = require('./controllers');

// app.use('/coffee', coffeeController);
// app.use('/user', userController);

// // Route for uploading images
// app.post('/upload', upload.single('image'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file received');
//     }

//     const params = {
//         Bucket: S3_BUCKET,
//         Key: req.file.originalname,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype,
//         ACL: 'public-read'
//     };

//     s3.upload(params, (err, data) => {
//         if (err) {
//             console.error('Error uploading to S3:', err);
//             return res.status(500).send('Error uploading to S3');
//         }

//         res.status(200).send(`File uploaded successfully at ${data.Location}`);
//     });
// });

// const server = async () => {
//     db();
//     app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
// };
// server();






