//LIBRARIES
const jwt = require("jsonwebtoken");
const promifisy = require("./../utils/promisify");
//MODELS
const User = require("../models/user");
//SERVICES
const userServices = require("./../services/userRequests");

let response = require("./../response");

const loginController = {};

const jwtVerify = promifisy(jwt.verify);
loginController.login = async (req, res) => {
    const { email, password } = req.body;

    if(email === "admin@mail.ru" && password === "0000"){
        response = {
            resultCode: 0,
            data: { 
                user,
                root: true
            }
        };
        
        res.status(200).json(response);
    }
    
    User.findOne({ email: email, password: password }, (err, user) => {
        if (err) {
            console.log(err)
        }
        
        if (user) {
            jwt.sign({ user: user }, "secretKey",async (err, token) => {
                if (err) {
                    console.log(err);
                }
            
                response = {
                    resultCode: 0,
                    data: { 
                        user,
                        root: false
                    }
                };
                
                res.status(200).json(response);
            });
        }
        else {
            response = {
                resultCode: 1,
                data: {},
                message: "Email or password is wrong"
            };
            res.status(400).json(response);
        }
    });
};

loginController.checkAuth = async (req, res) => {
    try {
        const [userInfo]  = await jwtVerify(req.token, "secretKey");

        const myProfile = await userServices.findUserByFilter(userInfo.user.email, "email");

        if(myProfile){
            response = {
                resultCode: 0,
                data: {user}
            };
    
            res.status(200).json(response);
        }
        
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = loginController;