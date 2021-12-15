const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./Routes/router');
const app = express();
const jwt = require('jsonwebtoken');
const {secret} = require('./Configs/tokenConfig');
const UserSchema = require('./Schema/UserSchema')

require("dotenv").config();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello, i am your backend")
})

mongoose
    .connect(process.env.DATABASE_URL,{useNewUrlParser:true, useUnifiedTopology:true })
    .then((res)=>console.log('Connected to DB'))
    .catch((error)=>console.log(error))

app.get('/token', async (req,res)=>{

    const token = req.headers["x-access-token"];
    const decodedId = jwt.verify(token,secret);
    // const user = await UserSchema.findById(decodedId.id);

    const users = await UserSchema.find({}, {firstName:1,lastName:1,email:1,username:1, dateOfBirth:1, gender:1, team:1, teamId:1});

})

app.use('/api', Routes)

app.listen(process.env.PORT, ()=>{console.log("Server has been started")})

