const User = require("../models/user");
const Chat = require("../models/chat");
const testController = {};

testController.delete = async (req, res) => {
    User.deleteMany({}, (err) => {
        if (err) {
            console.log("Delete failed: " + err);
            res.status(200).send("User wasn't deleted, check the console log");
        }

        res.status(200).send("Users were deleted");
    });
};

testController.get = async (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send("Cannot find any of users check the console log");
        }

        if (users !== undefined) {
            res.json(users);
        } else {
            res.send("None of users was found");
        }
    });
};

testController.clearDialogs = async (req, res) => {
    User.updateMany({}, {$set: {"chatsId": []}}, (err) => {
        if (err) {
            console.log(err);
        }
    });
    Chat.deleteMany({},(err)=>{
        if(err){
            console.log(err);
        }
    })

    User.find({}, (err, users) => {
        res.json(users);
    });
};

testController.deleteFriends = async (req, res) => {
    User.updateMany({}, {$set: {"friendsId": []}}, (err) => {
        if (err) {
            console.log(err);
        }
    });
    Chat.deleteMany({},(err)=>{
        if(err){
            console.log(err);
        }
    })

    User.find({}, (err, users) => {
        res.json(users);
    });
};

testController.deleteOne = async (req, res) => {
    const firstName = req.params.firstName
    
    User.deleteOne({firstName}, (err) => {
        if (err) {
            console.log(err);
        }
        User.find({}, (err, users) => {
            res.json(users);
        });
    });


   
};
module.exports = testController;
