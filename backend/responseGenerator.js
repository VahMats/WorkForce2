const mongoose = require("mongoose")
const UserSchema = require('./Schema/UserSchema')
const TeamSchema = require('./Schema/TeamSchema')

exports.UsersDataFind = async () => {
    const users = await UserSchema.find({}, {
        firstName: 1,
        lastName: 1,
        email: 1,
        username: 1,
        dateOfBirth: 1,
        gender: 1,
        team: 1,
        teamId: 1,
        deleted: 1
    });
    const availableUsers = users.filter(el => !el.deleted)
    return availableUsers;
}

exports.TeamsDataFind = async () => {
    const teams = await TeamSchema.find();
    const availableTeams = teams.filter(el => !el.deleted)
    return availableTeams;
}
