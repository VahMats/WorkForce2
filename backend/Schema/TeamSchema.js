const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({

    name:{
        type: String,
        required:true,
    },

    count:{
        type: Number,
        default: 0,
    },

    maxCount:{
        type: Number,
        required:true,
    },

    deleted:{
        type:Boolean,
        default:false,
    },
})

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
