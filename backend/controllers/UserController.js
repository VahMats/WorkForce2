const mongoose = require("mongoose");
const UserSchema = require("../Schema/UserSchema");
const ValidationChecker = require("../ValidationChecker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../Configs/tokenConfig");

const generateToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

exports.authentication = async (req, res) => {
  const authData = {
    isValid: false,
    userIsValid: false,
    passwordIsCorrect: false,
    token: "",
    data: [],
  };
  const validLogin = ValidationChecker(req.body, "login");
  if (validLogin.isValid) {
    authData.isValid = true;
    const { username, password } = req.body;
    const user = await UserSchema.find({ username });
    if (user.length) {
      authData.userIsValid = true;
      if (password === user[0].password) {
        authData.passwordIsCorrect = true;
        authData.data = user[0];
        authData.token = generateToken(user[0].id);
        res.status(200).send(authData).end();
      } else {
        res.send(authData).end();
      }
    } else {
      res.send(authData).end();
    }
  } else res.send(authData).end();
};

exports.register = async (req, res) => {
  const RegData = {
    isValid: false,
    usernameisUnique: false,
    emailIsUnique: false,
  };
  const validReg = ValidationChecker(req.body, "register");
  console.log(req.body)
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
        });
        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();
      }
    }
    res.status(200).send(RegData);
  }
};
