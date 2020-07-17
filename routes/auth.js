const router = require('express').Router();
const User = require('../model/User');

const { registerValidation, loginValidation } = require('../validation/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route /api/user/register :
router.post('/register', async (req, res) => {
    //Insomnia or Postman to test : res.send('Register');

    const validation = registerValidation(req.body);

    // Validation of data before creating a new user :
    if (validation.error) return res.status(400).send(validation.error.details[0].message);

    // Checking if the user is already in the database :
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Email already exists !');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        // Save in the DB :
        const savedUser = await user.save();
        res.send(savedUser);
    } catch {
        res.status(400).send(err);
    }

});

// Login 
router.post('/login', async (req, res) => {

    const validation = loginValidation(req.body);

    // Validation of data before logging in:
    if (validation.error) return res.status(400).send(validation.error.details[0].message);

    // Checking if the email exists in the database :
    const userData = await User.findOne({email : req.body.email});
    if(!userData) return res.status(400).send('Email doesn\'t exist !');

    // Check if password is correct : 
    const validPass = await bcrypt.compare(req.body.password, userData.password);
    if(!validPass) return res.status(400).send('Invalid password !');


    // Create and assign a token
    const token = jwt.sign({
        _id: userData._id, 
        name: userData.name
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send(token);

});


module.exports = router;