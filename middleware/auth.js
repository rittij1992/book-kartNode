const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message: 'Token not found'});
    }
    try {
        const decoded = jwt.verify(token, 'I love books');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({message: error.message});
    }
};

module.exports = auth;