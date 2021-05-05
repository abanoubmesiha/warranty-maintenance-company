const mongoose = require('mongoose');
const Joi = require('joi')
class APIError {
    constructor(code, message){
        this.code = code;
        this.message = message;
    }

    static unauthorized(){
        return new APIError(401, 'Unauthorized!')
    }

    static badReq(msg){
        return new APIError(400, msg)
    }
    
    static internal(msg){
        return new APIError(500, msg)
    }

    static middleware(err, req, res, next){
        if (err instanceof APIError){
            res.status(err.code).json(err.message);
            return;
        }
        if (err instanceof mongoose.Error){
            res.status(400).json(err.message);
            return;
        }
        if (err.isJoi){
            const messages = err.details.map(detail=>detail.message).join()
            res.status(422).json(messages);
            return;
        }
        
        res.status(500).json('Something went wrong!');
    }
}

module.exports = APIError;


