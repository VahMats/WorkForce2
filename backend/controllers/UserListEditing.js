const UserSchema = require('../Schema/UserSchema')
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