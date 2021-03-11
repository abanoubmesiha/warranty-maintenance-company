const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

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
            // {
            //     url: `http://localhost:${port}/`
            // },
        ]
    },
    apis: ["./routes/*.js"]
}
const specs = swaggerJsDoc(options)

const app = express();
app.use(bodyParser.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

// Import Routes
const userRoutes = require('./routes/users');

app.use('/users', userRoutes);

app.use('/', (req, res)=>{
    res.send("Hi there from github!");
});

// Connect to DB
mongoose.connect(
    // process.env.DB_CONNECTION || 
    "mongodb+srv://WAR-OWNER:P@ssw0rdWAR@warranty-maintenance-co.c46g7.mongodb.net/development?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>console.log('Connected to DB!')
)

app.listen(port, ()=>console.log("Listening to the app on port " + port))