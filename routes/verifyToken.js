const jwt = require('jsonwebtoken');

// Creation of a function that we can an add to any route that we want to protect : 
module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied !');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userData = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

