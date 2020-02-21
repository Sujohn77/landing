const mongoose = require("mongoose");

const eventScheme = new mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
}, {versionKey: false});

module.exports = mongoose.model("Event", eventScheme);
