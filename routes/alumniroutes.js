const User = require('../models/user');
const express= require('express');
const jwt = require('jsonwebtoken');
const config= require('../config/db');
const router=express.Router();
var app = express();
var mongoose = require('mongoose');
var multer = require('multer');
router.post('/register',function(req,res){

    if(!req.body.email)
    {
        res.json({success:false, message:"You Must Provide Email"})
    }
    else
    {
        if(!req.body.username)
        {
            res.json({success:false, message:"You Must Provide Username"})

        }
        else
        {
            if(!req.body.password)
            {
                res.json({success:false, message:"You Must Provide Password"})

            }
            else
            {
                let user = new User({
                    photo:"assets/images/alumni.png",
                    email:req.body.email.toLowerCase(),
                    username:req.body.username,
                    password:req.body.password,
                    name : "",
                    gender : "",
                    batch :"",
                    rollno : "",
                    phoneno :"",
                    currentlyworking : ""
                });
                user.save(function(err){
                    
                    if(err){
                            if(err.code ===11000)
                                 res.json({success:false, message:"Username or Email already Exists "})
                                 
                            else {
                                   if(err.errors)
                                   {
                                    if(err.errors.email){
                                        res.json({success:false, message:err.errors.email.message})
                                    }
                                    else
                                    {
                                        if(err.errors.username){
                                            res.json({success:false, message:err.errors.username.message})
                                        } 
                                        else{
                                            if(err.errors.password){
                                                res.json({success:false, message:err.errors.password.message})
                                            }
                                            else
                                            {
                                                res.json({success:false, message:err})
                                            }
                                        }

                                    }
                                   }
                                   else
                                   {
                                    res.json({success:false, message:"Could Not Save User ",err});
                                   }
                                }
                            }
                    else
                    res.json({success:true, message:"Account Registered Successfully!"})
                });

            }
           
        }
        
    }
})

router.post('/alumnilogin', (req,res)=>{
  if(!req.body.username){
      res.json({success:false, message:'No username was provided'});
  }
  else{
      if(!req.body.password)
      {
          res.json({success:false, message:"No password was provided"});
      }
      else
      {
            User.findOne({username:req.body.username}, function(err,user){
                if(err)
                {
                    res.json({success:false, message:err});
                }
                else{
                    if(!user)
                    {
                        res.json({success:false, message: "Username not found"});
                    }
                    else
                    {
                       // const validPassword = user.comparePassword(req.body.password);
                        if(user.password != req.body.password)
                        {
                            res.json({success:false, message: "invalid password"});
                        }
                        else
                        {

                            const token = jwt.sign({ userId: user._id}, config.secret, {expiresIn : '24h'} );
                             
                            res.json({success:true, message: "Success!", token: token, user:user.username});
                        }
                    }
                }
            })
      }
  }
})

router.post('/getdetails', function(req,res){
    user = req.body.user;
   // console.log(user);
        //var collection = mongoose.connection.db.collection("alumnis");
        User.findOne({'username':user.username }, (err,doc)=>{
            if(err)
                res.json({success : false, message : "Error in retrieving student details"});
            else    
            {
                //res.json({success : true, message : "Details got succesfully"});
                res.json(doc)
            }
                
        })
  })

  router.post("/updatedetails",function(req,res){
    var user = req.body.user;
    var collection = mongoose.connection.db.collection("alumnis");
    var ObjectID = require('mongodb').ObjectID;
    var data = {};
    data=req.body.value;
    //delete data['_id'];
    collection.updateOne({"username": req.body.username },
    { $set: req.body.value },
    { $upsert: true },
    function(err, result) {
        if(err){
        console.log(err)
        res.json("0")
    }   
    else
    {
        res.json("1")
    }
    });
});


  const DIR='./public/uploads';
  app.use(express.static(__dirname+'/public/uploads/'));
  
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  let upload = multer({storage: storage});
  
  router.post('/uploadPhoto', upload.single('photo'), (req, res) => {
    if(!req.file) {
      //console.log("No File Received");
      res.send("No File is Received Select one to Upload");
    } else {
      console.log("File Received");
      let file = req.file;
      //console.log(file);
      res.send (file.filename);
      //console.log(res);
    }
  });
  
  router.get('/public/uploads/:imgurl', (req, res) => {
      res.sendFile(req.params.imgurl, {root: './public/uploads/'});
  });
  
  

router.use((req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token)
    {
        res.json({success:false, message:'No Token Provided'});
    }
    else
    {
        jwt.verify(token, config.secret, (err,decoded)=>
        {
            if(err)
            {
                res.json({success:false, message : 'token invalid' + err})
            }
            else
            {
                req.decoded = decoded;
                next();
            }
        })
    }
});


router.get('/alumniprofile', (req,res)=>{
     User.findOne({ _id : req.decoded.userId}).select('username email').exec((err,user)=>{
         if(err)
         {
             res.json({success:false, message: err });
         }
         else
         {
             if(!user)
             {
                 res.json({success:false, message: 'User not found'});
             }
             else
             {
                 res.json({success:true, user:user });
             }
         }
     })
 });

module.exports=router;