const UserSchema = require('../Schema/UserSchema')
const TeamSchema = require('../Schema/TeamSchema')
const ValidationChecker = require("../ValidationChecker");
const bcrypt = require("bcrypt");

exports.userAdd = async (req,res) => {
    const userAddData = {
        isValid: false,
        usernameIsUnique: false,
        emailIsUnique: false,
    };
    const validReg = ValidationChecker(req.body, "register");
    if (validReg.isValid) {
        RegData.isValid = true;
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
        const oldUserUsername = await UserSchema.find({ username });
        if (oldUserUsername.length === 0) {
            userAddData.usernameIsUnique = true;
            const oldUserEmail = await UserSchema.find({ email });
            if (oldUserEmail.length === 0) {
                userAddData.emailIsUnique = true;
                const newUser = new UserSchema({
                    firstName,
                    lastName,
                    email,
                    dateOfBirth,
                    gender,
                    username,
                    password,
                    teamId
                });
                const salt = await bcrypt.genSalt(10);

                newUser.password = await bcrypt.hash(password, salt);

                await newUser.save();
            }
        }
        res.status(200).send(userAddData);
    }
}

exports.userEdit = async (req,res) => {
    const userEditingData = {
        isValid: false,
        newUsernameIsUnique: false,
        newEmailIsUnique: false,
        teamIsChanged: false,
        teamIsFull: true,
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



    const oldUser = UserSchema.findById(id, {firstName:1, lastName:1, email:1, username:1, dateOfBirth:1, gender:1, teamId:1})
    const anotherEmail = UserSchema.find({email});
    const anotherUsername = UserSchema.find({username});
    if (anotherEmail.length === 0 || anotherEmail[0]._id === id){
        userEditingData.newEmailIsUnique = true;
        if (anotherUsername.length === 0 || anotherUsername[0]._id === id) {
            userEditingData.newUsernameIsUnique = true;
            const validEdit = ValidationChecker(req.body, "edit");
            if (teamId){
                if (teamId !== oldUser[0].teamId){
                    userEditingData.teamIsChanged = true;
                    const newTeam = await TeamSchema.findById(teamId);
                    const newCount = newTeam[0].count + 1;
                    if (newCount <= newTeam[0].maxCount){
                        userEditingData.teamIsFull = false;
                        await TeamSchema.findByIdAndUpdate(teamId, {count:newCount});
                        const oldTeam = await TeamSchema.findById(oldUser[0].teamId);
                        const oldTeamsNewCount = oldTeam[0].count - 1;
                        await TeamSchema.findByIdAndUpdate(oldTeam[0]._id, {count:oldTeamsNewCount})
                    }
                }
            }


        }
    }


}

exports.userDelete = async (req,res) => {
    const deletingUserData = {
        UserExist: false,
    }
    const {id} = req.body
    const deletingUser = await UserSchema.findById(id);
    if (Object.values(deletingUser).length !== 0){
        deletingUserData.UserExist = true;
        await UserSchema.findByIdAndUpdate(id,{deleted:1});
    };
    res.send(deletingUserData);
}