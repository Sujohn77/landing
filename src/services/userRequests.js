const User = require("../models/user");
const userServices = {};

userServices.findUserByFilter = (filterValue,filterName) => {
    switch(filterName){
        case "email": 
            return User.findOne({email:filterValue},(err,user) => {
                if(err){
                    console.log(err);
                }
                else {
                    return user;
                }
            });
        case "id": 
            return User.findById(filterValue,(err,user) =>{
                if(err){
                    console.log(err);
                }
                else {
                    return user;
                }
            });
            default:
                return User.findById(filterValue,(err,user) =>{
                    if(err){
                        console.log(err);
                    }
                    else {
                        return user;
                    }
                });
    }
}

userServices.getUserChats = (id) => {
    return User.findById(id,async(err,user) => {
        if(err){
            console.log(err);
        }
        return user;
        
    })
}

userServices.findUsersByFilter = (filterValue,filterName) => {
    switch(filterName){
        case "id": 
            return User.find({ _id: { $in: filterValue }},(err,user) =>{
                if(err){
                    console.log(err);
                }
                else {
                    return user;
                }
            });
        case "email": 
            return User.find({ email: { $in: filterValue }},(err,users) =>{
                if(err){
                    console.log(err);
                }
                else {
                    return users;
                }
            });
            default:
                return User.find({ _id: { $in: filterValue }},(err,user) =>{
                    if(err){
                        console.log(err);
                    }
                    else {
                        return user;
                    }
                });
    }
}

userServices.updateChatsUser = (id,chatId) => {
    return User.updateOne({_id:id}, {$push: {chatsId: chatId}}, {useFindAndModify: false});
}

userServices.getFriends = (friendsId) => {
    return User.find({"_id": { $in:friendsId}},(err,users)=>{
        if(err){
            console.log(err)
        }
        return users;
    });
}

module.exports = userServices;