const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch'); 
//const student = require('../models/student');
const config= require('../config/db');

var batch;
router.post('/studentlogin', (req,res)=>{
    if(!req.body.batch)
    {
        res.json({success : false, message : 'No Batch Provided'});
    }
    else
    {
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
                var collection = mongoose.connection.db.collection(req.body.batch.toLowerCase());
                this.batch = req.body.batch;
                collection.findOne({'Roll_No':req.body.username.toUpperCase()}, function(err,user){
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
                              //const validPassword = user.comparePassword(req.body.password);
                              if(user.Password != req.body.password)
                              {
                                  res.json({success:false, message: "invalid password"});
                              }
                              else
                              {
                                  const token = jwt.sign({ userId: user._id}, config.secret, {expiresIn : '24h'} );
                                  res.json({success:true, message: "Success!", token: token, user:user.Roll_No, batch:user.Batch });
                              }
                          }
                      }
                  })
            }
        }
    }
  })
  //get student details (body can't be sent through GET request.. so POST is used here )
  router.post('/getdetails', function(req,res){
    user = req.body.user;
   // console.log(user);
        var collection = mongoose.connection.db.collection(user.mxians);
        collection.findOne({ 'Roll_No':user.rollno }, (err,doc)=>{
            if(err)
                res.json({success : false, message : "Error in retrieving student details"});
            else    
            {
                //res.json({success : true, message : "Details got succesfully"});
                res.json(doc)
            }
                
        })
  })


  /*
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
 
router.get('/studentprofile', (req,res)=>{
       //console.log(this.batch);
       //var collection = mongoose.connection.db.collection(this.batch);
       student.findOne({ _id : req.decoded.userId}).select('Roll_No').exec((err,user)=>{
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
  
*/


module.exports=router;