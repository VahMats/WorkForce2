const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./Routes/router');
const morgan = require("morgan");
const app = express();
const jwt = require('jsonwebtoken');
const {secret} = require('./Configs/tokenConfig');
const UserSchema = require('./Schema/UserSchema')
const TeamSchema = require('./Schema/TeamSchema')

require("dotenv").config();

app.use(express.json());

app.use(morgan('tiny'));

app.get('/', (req,res)=>{
    res.send("Hello, i am your backend")
})

mongoose
    .connect(process.env.DATABASE_URL,{useNewUrlParser:true, useUnifiedTopology:true })
    .then((res)=>console.log('Connected to DB'))
    .catch((error)=>console.log(error))

app.get('/token', async (req,res)=>{
    const tokenData = {
        userInfo: {},
        usersInfo: {},
        teamsInfo:{},
    }
    const token = req.headers["x-access-token"];
    const decodedId = jwt.verify(token,secret);
    console.log(decodedId)
    const id = decodedId.id
    const user = await UserSchema.findById(id, {firstName:1, lastName:1, email:1, username:1, dateOfBirth:1, gender:1, team:1, teamId:1, isAdmin:1});
    tokenData.userInfo = user
    if (user.isAdmin){
        const users = await UserSchema.find({}, {firstName:1, lastName:1, email:1, username:1, dateOfBirth:1, gender:1, team:1, teamId:1, deleted:1});
        const availableUsers = users.filter(el => !el.deleted)
        tokenData.usersInfo = availableUsers;
        const teams = await TeamSchema.find();
        tokenData.teamsInfo = teams;
    }
    res.status(200).send(tokenData)

})

app.use('/api', Routes)

app.listen(process.env.PORT, ()=>{console.log("Server has been started")})

