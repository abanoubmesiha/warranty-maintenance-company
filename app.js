const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const APIError = require('./models/api-error');
require('dotenv').config();

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
                url: "https://warranty-maintenance-company-dot-cool-adviser-307212.oa.r.appspot.com/"
            },
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
const loginRoute = require('./routes/login');
const roleRoutes = require('./routes/role');
const userRoutes = require('./routes/user');
const deviceRoutes = require('./routes/device');

app.use('/login', loginRoute);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/devices', deviceRoutes);

app.use('/', (req, res)=>{
    res.redirect('/api-docs');
});


app.use(APIError.middleware);

module.exports = app;