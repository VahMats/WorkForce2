const UserSchema = require('../Schema/UserSchema')
const ValidationChecker = require("../ValidationChecker");
const bcrypt = require("bcrypt");

exports.userAdd = async (req,res) => {
    const userAddData = {
        isValid: false,
        usernameisUnique: false,
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
            RegData.usernameisUnique = true;
            const oldUserEmail = await UserSchema.find({ email });
            if (oldUserEmail.length === 0) {
                RegData.emailIsUnique = true;
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
        res.status(200).send(RegData);
    }
}

exports.userEdit = async (req,res) => {

}

exports.userDelete = async (req,res) => {
    const data = {
        Userexist: false,
    }
    const {id} = req.body
    const deletingUser = await UserSchema.findById(id);
    console.log(deletingUser);
}