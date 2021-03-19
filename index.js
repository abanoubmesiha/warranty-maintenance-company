const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const APIError = require('./models/api-error');
require('dotenv').config();

const DbConnect = require('./util/database').DbConnect;

let port = process.env.PORT || 4000

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "warranty-maintenance-company",
            description: "Warranty Maintenance Company Management System for Engineers and Devices",
            version: "1.0.0",
        },
        servers: [
            {
                url: "https://warranty-maintenance-company.herokuapp.com/"
            },
            {
                url: `http://localhost:${port}/`
            }
        ]
    },
    apis: ["./routes/*.js"]
}
const specs = swaggerJsDoc(options)

const app = express();
app.use(bodyParser.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

// Import Routes
const userRoutes = require('./routes/user');
const deviceRoutes = require('./routes/device');

app.use('/users', userRoutes);
app.use('/devices', deviceRoutes);

app.use('/', (req, res)=>{
    res.redirect('/api-docs');
});


app.use(APIError.middleware);

// Connect to DB
DbConnect(()=>{
    app.listen(port, ()=>console.log("Listening to the app on port " + port))
})