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
}

module.exports = APIError;