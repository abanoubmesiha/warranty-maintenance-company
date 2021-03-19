
const app = require('./app');
const DbConnect = require('./util/database').DbConnect;
let port = process.env.PORT || 4000

// Connect to DB
DbConnect(()=>{
    app.listen(port, ()=>console.log("Listening to the app on port " + port))
})