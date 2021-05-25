const mongoose = require('mongoose');

const DbConnect = cb => {
    mongoose.connect(
        process.env.NODE_ENV === 'test'
        ?process.env.DB_CONNECTION_TEST
        :process.env.DB_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        ()=>{
            console.log('Connected to DB!')
            if (cb){
                cb();
            }
        }
    )
}

exports.DbConnect = DbConnect;