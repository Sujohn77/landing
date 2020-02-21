const mongoose = require("mongoose");

const commentScheme = new mongoose.Schema({
    text: {type: String, required: true},
    email:{type: String, required: true},
}, {versionKey: false});

module.exports = mongoose.model("Comment", commentScheme);
