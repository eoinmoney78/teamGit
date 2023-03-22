//Requiring dependencies that I installed
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

//env port OR 5001
const PORT = process.env.PORT || 5001;

//Requiring from the Controllers Folder
const userController = require('./controllers/user.controller.js');

//connection from my .env file
const DBURL = process.env.DBURL;

// connection middleware. Est. route and defining the Collection I am targeting.
mongoose.connect(`${DBURL}/esspresso`);

// event listener to check if connected.
const db = mongoose.connection;

// event listener to check & show connection on console.
db.once("open", () => console.log(`Connected: ${DBURL}`));

// added to allow us to accept JSON data from the body of our client.
app.use(express.json());

//Helps with sharing connection to front end. 
app.use(cors());

//Using Controllers
app.use('/user', userController);

//Listening to port and displaying on our console.
app.listen(PORT, () => console.log(`reactChat Server Running on Port: ${PORT}`));

