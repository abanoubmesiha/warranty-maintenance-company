const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "warranty-maintenance-company",
            description: "Engineers and Devices Management System",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000/"
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
const userRoutes = require('./routes/users');

app.use('/users', userRoutes);

app.use('/', (req, res)=>{
    res.send("Hi there!");
});


// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>console.log('Connected to DB!')
)

app.listen(process.env.PORT || 3000)