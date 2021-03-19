const mongoose = require('mongoose');

const DbConnect = cb => {
    mongoose.connect(
        process.env.DB_CONNECTION,
        { useNewUrlParser: true, useUnifiedTopology: true },
        ()=>{
            console.log('Connected to DB!')
            if (cb){
                cb();
            }
        }
    )
}

exports.DbConnect = DbConnect;