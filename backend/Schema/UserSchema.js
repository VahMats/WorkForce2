const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    username:{
        type: String,
        required:true,
        unique: true,
    },
    dateOfBirth:{
        type: String,
        required:true,
    },
    gender:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    team:{
        type: String,
        default: "-",
    },
    teamId:{
        type:String,
    },
    deleted:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
