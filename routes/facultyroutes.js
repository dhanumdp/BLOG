const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch'); 
const User = require('../models/faculty');
const config= require('../config/db');


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
                              res.json({success:true, message: "Success!", token: token,user:user.Username});
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
        collection.findOne({'Username':user.Username }, (err,doc)=>{
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
    collection.updateOne({"Username": req.body.Username },
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

  
module.exports=router;