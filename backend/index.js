const express = require('express');
const mongoose = require('mongoose')
const Routes = require('./Routes/router')
const app = express();

require("dotenv").config();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello, i am your backend")
})

mongoose
    .connect(process.env.DATABASE_URL,{useNewUrlParser:true, useUnifiedTopology:true })
    .then((res)=>console.log('Connected to DB'))
    .catch((error)=>console.log(error))

app.use('/api', Routes)

app.listen(process.env.PORT, ()=>{console.log("Server has been started")})

