const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },
            process.env.SECRET_TOKEN,
            {
                expiresIn: '3d'
            });
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(token) {
        jwt.verify(token, process.env.SECRET_TOKEN, (error, decode) => {
            if(error) {
                res.status(400).json({message: "invalid token"});
            } else {
                req.user = decode
                next();
            }
        })
    } else {
        res.status(400).json({message: "no token"})
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(400).json({message: "no admin token"})
    }
} 

module.exports = { generateToken, isAuth, isAdmin}