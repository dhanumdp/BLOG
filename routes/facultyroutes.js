const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch'); 
//const User = require('../models/faculty');
const config= require('../config/db');
var app = express();
var multer=require('multer');

router.post('/facultylogin', (req,res)=>{
    if(!req.body.Username){
        res.json({success:false, message:'No username was provided'});
    }
    else{
        if(!req.body.Password)
        {
            res.json({success:false, message:"No password was provided"});
        }
        else
        {
            var collection = mongoose.connection.db.collection("Faculty"); 
            collection.findOne({Username:req.body.Username.toLowerCase()}, function(err,user){
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
                        
                        if(user.Password != req.body.Password)
                              {
                                  res.json({success:false, message: "invalid password"});
                              }  
                              else
                          {
  
                              const token = jwt.sign({ userId: user._id}, config.secret, {expiresIn : '24h'} );
                              res.json({success:true, message: "Success!", token: token,user:user.Name});
                          }
                      }
                  }
              })
        }
    }
  })
   //get student details (body can't be sent through GET request.. so POST is used here )
  router.post('/getdetails', function(req,res){
    user = req.body.user;
   // console.log(user);
        var collection = mongoose.connection.db.collection("Faculty");
        collection.findOne({'Name':user.Name }, (err,doc)=>{
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
    var collection = mongoose.connection.db.collection("Faculty");
    var ObjectID = require('mongodb').ObjectID;
    var data = {};
    data=req.body.value;
    //delete data['_id'];
    collection.updateOne({"Name": req.body.Name },
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


//get student details

router.post('/studentDetails',(req,res)=>{

  const user=req.body.user;
  console.log(user);
  var collection=mongoose.connection.db.collection(user.batch);

collection.find({'Roll_No':user.rollno}).count((error,num)=>{
  if(num==0)
  {
    res.json({success : false, message : "Student Not Found"});
  }
  else
  {
    collection.findOne({'Roll_No':user.rollno},(err,doc)=>{
      if(err)
      res.json({success : false, message : "Error in retrieving student details"});
    else    
      {
        res.json({success : true, data : doc});
      
    }
    })
  }
})

 
});


//get Alumni Details

router.post('/alumniDetails',(req,res)=>{

  User.findOne({'username':req.body.username }, (err,doc)=>{
    if(err)
        res.json({success : false, message : "Error in retrieving student details"});
    else    
    {
        //res.json({success : true, message : "Details got succesfully"});
        res.json(doc)
    }
        
})
})

//get Alumni Names

router.get('/alumniNames',(req,res)=>{

  var collection=mongoose.connection.db.collection('alumnis');

  collection.find({},{projection:{_id:0,username : 1}}).toArray((err,doc)=>{
  // User.find({},{projection : } , (err,doc)=>{
      if(err)
          res.json({success : false, message : "Error in retrieving student details"});
      else    
      {
          //res.json({success : true, message : "Details got succesfully"});
          res.json(doc);
      }
          
  })
})

module.exports=router;