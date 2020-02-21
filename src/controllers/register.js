//LIBRARIES
const jwt = require("jsonwebtoken");
//MODELS
const User = require("../models/user");

const userServices = require("./../services/userRequests");

let response = require("./../response");

const registerController = {};

registerController.registerMe = async (req, res) => {
    const {email, password} = req.body;

    User.find({email},(err,user)=>{
        if(err){
            console.log(err)
        }

        if(user.length !== 0){
            response = {
                data:{},
                message:"This email already registered",
                resultCode: 1
            }
            res.status(400).json(response);
        }
    });

    User.create({email, password}, async (err) => {
        if (err) {
            console.log(err);
        }
        else {
            const user = {email, password};

            if (error) {
                console.log(err)
            }

            response = {
                resultCode: 0,
                data: {user}
            };
            res.status(200).json(response);
            // jwt.sign({user: dataToken}, "secretKey",async (error, token) => {
            //     if (error) {
            //         console.log(err)
            //     }

            //     response = {
            //         resultCode: 0,
            //         data: {user,token}
            //     };
            //     res.status(200).json(response);
            // });
        }
        
    });
};

module.exports = registerController;