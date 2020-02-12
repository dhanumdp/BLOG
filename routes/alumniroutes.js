const User = require('../models/user');
const express= require('express');
const jwt = require('jsonwebtoken');
const config= require('../config/db');
const router=express.Router();

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
                    email:req.body.email.toLowerCase(),
                    username:req.body.username.toLowerCase(),
                    password:req.body.password
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
            User.findOne({username:req.body.username.toLowerCase()}, function(err,user){
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
                        const validPassword = user.comparePassword(req.body.password);
                        if(!validPassword)
                        {
                            res.json({success:false, message: "invalid password"});
                        }
                        else
                        {

                            const token = jwt.sign({ userId: user._id}, config.secret, {expiresIn : '24h'} );
                             
                            res.json({success:true, message: "Success!", token: token, user:{username:user.username}});
                        }
                    }
                }
            })
      }
  }
})

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

