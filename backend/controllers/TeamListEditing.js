const TeamSchema = require('../Schema/TeamSchema');
const UserSchema = require('../Schema/UserSchema')
const mongoose = require('mongoose')
const {TeamsDataFind, UsersDataFind} = require('../responseGenerator')

exports.teamAdd = async (req,res) => {
    const teamAddData = {
        teamsData: []
    }
    const {name, maxCount} = req.body;
    const newTeam = new TeamSchema({
        name,
        maxCount,
    });
    await newTeam.save();

    teamAddData.teamsData = await TeamsDataFind();
    console.log(teamAddData)
    res.status(200).send(teamAddData);

}

exports.teamEdit = async (req,res) => {
    const teamEditingData = {
        countIsValid: false,
        teamsData: [],
    }
    console.log(req.body)
    const {id, name, maxCount} = req.body;
    const thisTeam = await TeamSchema.findById(id);
    if (thisTeam.count <= maxCount){
        teamEditingData.countIsValid = true;
        await TeamSchema.findByIdAndUpdate(id, {name, maxCount});
        teamEditingData.teamsData = await TeamsDataFind();
    }
    res.status(200).send(teamEditingData);
}

exports.teamDelete = async (req,res) => {
    const teamDeletingData = {
        usersData:[],
        teamsData:[],
    }
    const {id} = req.body;
    const deletingTeam = await TeamSchema.findById(id);

    await TeamSchema.findByIdAndUpdate(id, {deleted:1});

    for (let i = 0; i < deletingTeam.count; i++) {
        await UserSchema.findOneAndUpdate({teamId:id}, {teamId:0, team:"-"})
    }

    teamDeletingData.usersData = await UsersDataFind();
    teamDeletingData.teamsData = await TeamsDataFind();
    console.log(teamDeletingData)
    res.status(200).send(teamDeletingData);

}
