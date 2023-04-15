//* Dependencies
require('dotenv').config();
const { generateUploadURL } = require('./s3.js');
const express = require('express');
const app = express();

const cors = require('cors')
const PORT = process.env.PORT || 5001;



//* Imports
const { db } = require('./db')

app.get('/generate-upload-url', async (req, res) => {
    const result = await generateUploadURL();
    console.log('generateUploadURL result:', result); // Added console.log
    if (result.success) {
        res.status(200).json({
            uploadURL: result.uploadURL,
            imageName: result.imageName
        });
    } else {
        res.status(500).json({
            message: result.message,
            error: result.error
        });
    }
});

//* Middleware
// added to allow us to accept JSON data from the body of our client.
app.use(express.json());
// Helps with sharing connection to front end. 
app.use(cors());

const { coffeeController, userController } = require('./controllers');

//* Routes

app.use('/coffee', coffeeController);
app.use('/user', userController);

//* Connection
const server = async () => {
    db();
    // Listening to port and displaying on our console.
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
};
server();