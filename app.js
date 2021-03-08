const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json())

// Import Routes
const userRoutes = require('./routes/users');

app.use('/users', userRoutes);


// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>console.log('Connected to DB!')
)

app.listen(3000)