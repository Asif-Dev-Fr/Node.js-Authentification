const router = require('express').Router();

// Route /api/user/register :
router.post('/register', (req, res) => {
    res.send('Register');
})


module.exports = router;