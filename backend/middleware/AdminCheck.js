const jwt = require('jsonwebtoken');
const {secret} = require('../Configs/tokenConfig');
const UserSchema = require("../Schema/UserSchema")

module.exports = async function (req, res, next) {
    try{
        const token = req.headers["x-access-token"];
        if (!token){
            res.send({message: "User not authorized"});
        }
        else {
            const decodedToken = jwt.verify(token,secret);
            const tokenData = await UserSchema.findById(decodedToken.id)
            if (tokenData.isAdmin){
                next();
            }else {
                res.send({message: "User is not admin"});
            }
        }
    }
    catch (e) {
        console.log(e)
        res.send({message: "User not authorized"});
    }
}
