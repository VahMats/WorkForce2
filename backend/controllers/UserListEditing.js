const UserSchema = require('../Schema/UserSchema');
const TeamSchema = require('../Schema/TeamSchema');
const ValidationChecker = require("../ValidationChecker");
const bcrypt = require("bcrypt");
const {UsersDataFind, TeamsDataFind} = require('../responseGenerator');
const mongoose = require("mongoose")

exports.userAdd = async (req, res) => {
    const userAddData = {
        isValid: false,
        usernameIsUnique: false,
        emailIsUnique: false,
        usersData: [],
        teamsData: [],
    };
    const validReg = ValidationChecker(req.body, "register");
    if (validReg.isValid) {
        userAddData.isValid = true;
        console.log(req.body)
        const {
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            username,
            password,
            teamId
        } = req.body;
        const oldUserUsername = await UserSchema.find({username});
        if (oldUserUsername.length === 0) {
            userAddData.usernameIsUnique = true;
            const oldUserEmail = await UserSchema.find({email});
            if (oldUserEmail.length === 0) {
                userAddData.emailIsUnique = true;
                let team = "-"

                if (teamId) {
                    const addedTeam = await TeamSchema.findById(teamId);
                    const addedCount = addedTeam.count + 1;
                    await TeamSchema.findOneAndUpdate(teamId, {count: addedCount})
                    team = addedTeam.name;
                }

                const newUser = new UserSchema({
                    firstName,
                    lastName,
                    email,
                    dateOfBirth,
                    gender,
                    username,
                    password,
                    team,
                    teamId,
                });
                const salt = await bcrypt.genSalt(10);

                newUser.password = await bcrypt.hash(password, salt);

                await newUser.save();

                userAddData.usersData = await UsersDataFind();
                userAddData.teamsData = await TeamsDataFind();
            }
        }
    }
    res.status(200).send(userAddData);
}

exports.userEdit = async (req, res) => {
    const userEditingData = {
        isValid: false,
        newEmailIsUnique: false,
        newUsernameIsUnique: false,
        teamIsFull: true,
        usersData: [],
        teamsData: [],
    }

    const {
        id,
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        username,
        teamId
    } = req.body;


    const oldUser = await UserSchema.findById(id, {
        firstName: 1,
        lastName: 1,
        email: 1,
        username: 1,
        dateOfBirth: 1,
        gender: 1,
        teamId: 1
    })
    const validEdit = ValidationChecker(req.body, "edit");
    if (validEdit.isValid) {
        userEditingData.isValid = true;
        const anotherEmail = await UserSchema.findOne({email}, {id: 1});
        const anotherUsername = await UserSchema.findOne({username}, {id: 1});
        if (!anotherEmail || anotherEmail._id.toString() === id) {
            userEditingData.newEmailIsUnique = true;
            let team = "-"
            if (!anotherUsername || anotherUsername._id.toString() === id) {
                userEditingData.newUsernameIsUnique = true;
                if (teamId) {
                    if (teamId !== oldUser.teamId) {
                        const newTeam = await TeamSchema.findById(teamId);
                        const newCount = newTeam.count + 1;
                        if (newCount <= newTeam.maxCount) {
                            team = newTeam.name;
                            userEditingData.teamIsFull = false;
                            await TeamSchema.findByIdAndUpdate(teamId, {count: newCount});
                            if (oldUser.teamId) {
                                const oldTeam = await TeamSchema.findById(oldUser.teamId);
                                const oldTeamsNewCount = oldTeam.count - 1;
                                await TeamSchema.findByIdAndUpdate(oldTeam._id, {count: oldTeamsNewCount})
                            }
                        }
                    } else {
                        let teamsName = await TeamSchema.findById(teamId);
                        team = teamsName.name;
                    }
                }

                await UserSchema.findByIdAndUpdate(id, {
                    firstName,
                    lastName,
                    email,
                    dateOfBirth,
                    gender,
                    username,
                    team,
                    teamId
                })

                userEditingData.usersData = await UsersDataFind();
                userEditingData.teamsData = await TeamsDataFind();
            }

        }
    }
    res.status(200).send(userEditingData)

}

exports.userDelete = async (req, res) => {
    const userDeletingData = {
        UserExist: false,
        usersData: [],
        teamsData: [],
    }
    const {id} = req.body
    const deletingUser = await UserSchema.findById(id);
    console.log(deletingUser)
    if (deletingUser.teamId && deletingUser.teamId !== "0") {
        const teamOfDeletingUser = await TeamSchema.findById(deletingUser.teamId);
        const changedTeamCount = teamOfDeletingUser.count - 1;
        await TeamSchema.findByIdAndUpdate(deletingUser.teamId, {count: changedTeamCount})
    }
    await UserSchema.findByIdAndUpdate(id, {deleted: 1});
    userDeletingData.usersData = await UsersDataFind();
    userDeletingData.teamsData = await TeamsDataFind();
    res.status(200).send(userDeletingData);
}
