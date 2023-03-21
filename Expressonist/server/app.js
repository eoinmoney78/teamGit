//* Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5001;

//* Imports
const { db } = require('./db')
const { coffeeController, userController } = require('./controllers');

//* Middleware
// added to allow us to accept JSON data from the body of our client.
app.use(express.json());
// Helps with sharing connection to front end. 
app.use(cors()); 

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