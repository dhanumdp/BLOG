const User = require('../models/user');
const express= require('express');
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



module.exports=router;

