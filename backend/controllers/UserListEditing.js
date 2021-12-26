const UserSchema = require('../Schema/UserSchema');
const TeamSchema = require('../Schema/TeamSchema');
const ValidationChecker = require("../ValidationChecker");
const bcrypt = require("bcrypt");
const {UsersDataFind} = require('../responseGenerator');

exports.userAdd = async (req,res) => {
    const userAddData = {
        isValid: false,
        usernameIsUnique: false,
        emailIsUnique: false,
        usersData: [],
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
        const oldUserUsername = await UserSchema.find({ username });
        if (oldUserUsername.length === 0) {
            userAddData.usernameIsUnique = true;
            const oldUserEmail = await UserSchema.find({ email });
            if (oldUserEmail.length === 0) {
                userAddData.emailIsUnique = true;
                let team = "-"

                if (teamId){
                    const addedTeam = await TeamSchema.findById(teamId);
                    const addedCount = addedTeam.count + 1;
                    await TeamSchema.findOneAndUpdate(teamId, {count:addedCount})
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
            }
        }
    }
    console.log(userAddData)
    res.status(200).send(userAddData);
}

exports.userEdit = async (req,res) => {
    const userEditingData = {
        isValid: false,
        newEmailIsUnique: false,
        newUsernameIsUnique: false,
        teamIsChanged: false,
        teamIsFull: true,
        usersData: [],
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
    const validEdit = ValidationChecker(req.body, "edit");
    if (validEdit.isValid) {
        userEditingData.isValid = true;
        const anotherEmail = UserSchema.find({email});
        const anotherUsername = UserSchema.find({username});
        if (anotherEmail.length === 0 || anotherEmail[0]._id === id){
        userEditingData.newEmailIsUnique = true;
            if (anotherUsername.length === 0 || anotherUsername[0]._id === id) {
            userEditingData.newUsernameIsUnique = true;
                if (teamId) {
                    if (teamId !== oldUser[0].teamId) {
                        userEditingData.teamIsChanged = true;
                        const newTeam = await TeamSchema.findById(teamId);
                        const newCount = newTeam[0].count + 1;
                        if (newCount <= newTeam[0].maxCount) {
                            userEditingData.teamIsFull = false;
                            await TeamSchema.findByIdAndUpdate(teamId, {count: newCount});
                            const oldTeam = await TeamSchema.findById(oldUser[0].teamId);
                            const oldTeamsNewCount = oldTeam[0].count - 1;
                            await TeamSchema.findByIdAndUpdate(oldTeam[0]._id, {count: oldTeamsNewCount})
                            await UserSchema.findByIdAndUpdate(id,{firstName, lastName, email, dateOfBirth, gender, username, teamId})
                            userEditingData.usersData = await UsersDataFind();

                        }
                    }
                }
            }

        }
    }
    res.status(200).send(userEditingData)

}

exports.userDelete = async (req,res) => {
    const userDeletingData = {
        UserExist: false,
        usersData: [],
    }
    const {id} = req.body
    const deletingUser = await UserSchema.findById(id);
    if (Object.values(deletingUser).length !== 0){
        userDeletingData.UserExist = true;
        await UserSchema.findByIdAndUpdate(id,{deleted:1});
        userDeletingData.usersData = await UsersDataFind();
    };
    res.send(userDeletingData);
}