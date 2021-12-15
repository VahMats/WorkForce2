const TeamSchema = require('../Schema/TeamSchema')

exports.teamAdd = async (req,res) => {
    const {name, maxCount} = req.body;
    const newTeam = new TeamSchema({
        name,
        maxCount,
    });
    await newTeam.save();
}

exports.teamEdit = async (req,res) => {

}

exports.teamDelete = async (req,res) => {

}