const router = require('express').Router();
const User = require('../model/User');

const {registerValidation} = require('../validation/validation');

// Route /api/user/register :
router.post('/register', async (req, res) => {
    //Insomnia or Postman to test : res.send('Register');

    const validation = registerValidation(req.body);
    
    if(validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    } else {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        try {
            // Save in the DB :
            const savedUser = await user.save();
            res.send(savedUser);
        } catch {
            res.status(400).send(err);
        }
    }
});


module.exports = router;