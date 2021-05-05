const jwt = require('jsonwebtoken');
const APIError = require('../models/api-error');

module.exports = async function(req, res, next){
    const token = req.header('auth-token');
    if (!token){
        next(APIError.unauthorized())
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified;
            next()
        } catch (err) {
            next(APIError.badReq('Invalid Token'))
        }
    }
}