const { error } = require('console');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'k2vyFeN72qnbmTvdnxXr';

function authenticateJWT(req, res, next){
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({error: "토큰 없음"});
    }

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user=decoded;
        next();
    }catch (ex) {
        res.status(400).json({error:"이상한 토큰이들어옴 (형식 안맞음"});
    }
}

module.exports=authenticateJWT;