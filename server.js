const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require('path');
const jwt = require("jsonwebtoken")
const fs = require('fs');
const app = express();
const server = require("http").Server(app);
const routes = require("./src/routes");
const bodyParser = require('body-parser')

const User = require("./src/models/user");
const Comment = require("./src/models/comment");
const Event = require("./src/models/event");

const serverOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};
const MONGO_URI = "mongodb://localhost:27017/usersdb?keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000";
mongoose.connect(MONGO_URI, serverOptions).then(() => {
  console.log("Mongo connected:");
});

var dir = path.join(__dirname, 'public');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('*', function (req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});
// app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.options('*', cors())

app.get("/",(req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// register
app.post("/registerMe",(req, res) => {
    const { email, password } = req.body;
    if(email && password){
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
          }else{
            User.create({ email: email, password: password }, (err, user) => {
                  jwt.sign({ user: user }, "secretKey",async (err, token) => {
                      if (err) {
                          console.log(err);
                      }
                  
                      response = {
                          resultCode: 0,
                          data: { 
                              user,
                              token,
                              root: false
                          }
                      };
                      
                      res.status(200).json(response);
                  });
              }
          )};
          }
        );
    }
});
// login
app.post("/login",(req, res) => {
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
                          token,
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
});
// check auth
app.post("/auth",async(req, res) => {
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
});
// add event
app.post("/addEvent",(req, res) => {
    const { title, desc } = req.body;
    if(title && desc){
        Event.create({ email: email, text: text },(err)=>{
            if(err) console.log(err)
            
            Event.find({},(err,events)=>{
                if(err) console.log(err)
                if(events.length > 0){
                    console.log(comments)
                    response = {
                        resultCode: 0,
                        data: {events}
                    };
                    res.status(200).json(response);
                }
            })
           
        })
    }
});
// delete event
app.delete("/deleteEvent",(req, res) => {
    const id = req.body;
    if(id){
        Event.delete({ id: id},(err)=>{
            if(err) console.log(err)
            
            response = {
                data:{},
                resultCode:0
            }

            res.status(200).json(response);
           
        })
    }
});
// edit event
app.put("/editEvent",(req, res) => {
    const {title,desc} = req.body;
    if(id){
        Event.updateOne({ title: title,desc:desc},(err,event)=>{
            if(err) console.log(err)
            
            response = {
                data:{event},
                resultCode:0
            }

            res.status(200).json(response);
           
        })
    }
});
// add comment
app.post("/comment",(req, res) => {
    const { email, text } = req.body;
    if(email && text){
        Comment.create({ email: email, text: text },(err)=>{
            if(err) console.log(err)
            
            Comment.find({},(err,comments)=>{
                if(err) console.log(err)
                if(comments.length > 0){
                    console.log(comments)
                    response = {
                        resultCode: 0,
                        data: {comments}
                    };
                    res.status(200).json(response);
                }
            })
           
        })
    }
});

app.use("*",routes);
server.listen(3001);
console.log("Server is listening on  3001" );

module.exports = app;