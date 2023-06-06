const User = require("../models/User");
const jwt = require('jsonwebtoken');

module.exports.isAuthorized = function (req, res, next) {
    let token = req.headers.authorization
    const jwtkey = 'e-comm';
    
    if (token == null) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, jwtkey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        next();
    });
}