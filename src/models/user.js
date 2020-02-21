const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    root:{type:Boolean,require:true}
}, {versionKey: false});

module.exports = mongoose.model("User", userScheme);
