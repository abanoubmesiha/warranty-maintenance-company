const mongoose = require('mongoose');

class APIError {
    constructor(code, message){
        this.code = code;
        this.message = message;
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
        
        res.status(500).json('Something went wrong!');
    }
}

module.exports = APIError;


