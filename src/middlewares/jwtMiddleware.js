const jwt = require('jsonwebtoken');

const tokenMiddleware = (req, res, next) => {
    const token = req.body.authorization || req.query.authorization || req.headers['authorization'];
    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (!err) { return next() }

        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
        }
    });
};

module.exports = {
    tokenMiddleware
};