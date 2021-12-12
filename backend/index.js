const express = require('express');
const mongoose = require('mongoose')
const Routes = require('./Routes/router')
const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello, i am your backend")
})

mongoose
    .connect('mongodb+srv://Vahe:pass555@cluster0.08b0r.mongodb.net/WorkForce?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true })
    .then((res)=>console.log('Connected to DB'))
    .catch((error)=>console.log(error))

app.use('/api', Routes)

app.listen(5000, ()=>{console.log("Server has been started")})

