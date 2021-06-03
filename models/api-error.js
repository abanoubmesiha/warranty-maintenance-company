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
        console.log(err)
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
        if (err.status && err.type.match(/parse/gi)){
            res.status(err.status).json("Parse Error! Check the JSON object you sent, please!");
            return;
        }
        
        res.status(500).json('Something went wrong! It is probably due to Server/Node compiling');
    }
}

module.exports = APIError;


