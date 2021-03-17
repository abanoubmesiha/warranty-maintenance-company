const APIError = require("./APIError");

function APIErrorHandler(err, req, res, next){
    if (err instanceof APIError){
        res.status(err.code).json(err.message);
        return;
    }
    
    res.status(500).json('Something went wrong!');
}

module.exports = APIErrorHandler;