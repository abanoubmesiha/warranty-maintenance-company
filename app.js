const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//ROUTES

app.get('/', (req, res)=>{
    res.send('Hi!');
})

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>console.log('Connected to DB!')
)

app.listen(3000)