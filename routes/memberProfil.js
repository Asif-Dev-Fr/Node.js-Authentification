const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({ 
        profil : {
            name : req.userData.name, 
            email : req.userData.email,
        } 
    });
});


module.exports = router;