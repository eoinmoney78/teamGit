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



