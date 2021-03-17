const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
    MongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client=>{
        console.log('Connected to Database!');
        _db = client.db()
        cb(client)
    })
    .catch(err=>console.log(err))
}

const getDb = () => {
    if (_db){
        return _db;
    } else {
        throw 'No Database Found'
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;