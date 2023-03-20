
//Requiring
const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');


router.post('/signup', async (req, res) => {

    try {
        // Creating a new object based off the Model Schema. Getting the users information from the front end with req.body
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13)           
        });
        // writes to database. Returns a response - why it should be an "await"
        const newUser = await user.save(); 

        //Provividing the user a JWT token
        const token = jwt.sign({id: newUser._id}, process.env.JWT, {expiresIn: "1 day"});

        // Responding with a status to the client
        newUser ?
            res.status(200).json({
                user: newUser,
                message: "Success! User Created!",
                token
            }) :
            res.status(404).json({
                message: "Incomplete"
                
            })

    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
});


router.post('/login', async (req, res) => {
    try {

        //1. Capture data provided by the user (req.body)
        const { email, password } = req.body;

        //2. Check database to see if email supplied exists
        const user = await User.findOne({email: email});
        
        console.log(user);

        //3. Check if email or password exists.
        if(!user) throw new Error('Email or Password does not match');
        const passwordCheck = await bcrypt.compare(password, user.password); // returns a true/false value.        
        if(!passwordCheck) throw new Error("Email or Password does not match");

        //4. After verified, providing with a token.
        const token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: 60 * 60 * 24});
        //5. Responding with a status
        email ? 
            res.status(200).json({
                user,
                token
            }) :
            res.status(404).json({
                message: "Something went wrong"
            })
    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
})

router.get('/', validateSession, async (req, res) => {
    try {

        const users = await User.find();

        users ?
            res.status(200).json({
                users
            }) :
            res.status(404).json({
                message: "No user found"
            })

    } catch (err) {
        errorResponse(res, err);
    }
})

module.exports = router;