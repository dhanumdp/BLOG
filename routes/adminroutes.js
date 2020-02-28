const admin = require('../models/admin');
const express= require('express');
const jwt = require('jsonwebtoken');
const config= require('../config/db');
const router=express.Router();
const mongoose=require('mongoose');
//create a class
router.post("/createClass",function(req,res,next){
    var mxians=req.body.mxians.toLowerCase();
    var prefix=req.body.prefix;
    var start=req.body.start;
    var end=req.body.end;
    var myobj=[];
    var collection = mongoose.connection.db.collection(mxians);
    collection.find({}).toArray(function(err) {
        if(err)
        console.log(err);
        else{
            {
                var a;
                for (i = start; i <= end; i++) {  
                    
                    a=i;
                    myobj.push({
                        
                        "Roll_No":prefix+a,
                        "Password":prefix+a,
                        "Class_Prefix":prefix,
                        "Batch":mxians,
                        "Name":"-",
                        "DOB":"",
                        "Father_Name":"",
                        "Mother_Name":"",
                        "Gender":"",
                        "Email":"",
                        "Address":"",
                        "Phone_Number":"",
                        "Father_Annual_Income":"",
                        "Religion":"",
                        "Caste":"",
                        "Blood_Group":""
                   });
                } 
                collection.insertMany(myobj, function(err, response) {
                    if (err) res.json("Oops"+JSON.stringify(err,undefined,2));
                    else    res.json("Hurray");
                  });
                            
            }
            }
        });
      
});

//delete class
router.delete("/deleteClass",function(req,res,next){
    var mxians=req.body.mxians.toLowerCase();
    console.log("Class to be deleted: "+mxians)
    var collection = mongoose.connection.db.collection(mxians);
    collection.drop({},function(err,result){
        if(err){
            console.log("Delete Class Error:  "+err)
            res.send("Oops");
        }
        else{
            res.send("Hurray");
        }
    })

});





//delete student
router.delete("/deleteStudent",function(req,res,next){
    var mxians=req.body.mxians.toLowerCase();
    var rollno=req.body.rollno;
    var collection = mongoose.connection.db.collection(mxians);
    collection.remove({"Roll No":rollno},function(err,result){
        if(err){
            console.log("Delete Student Error:  "+err)
            res.send("Oops");
        }
        else{
            res.send("Hurray");
        }
    })

});

    
//create new Faculty
router.post("/createFaculty",function(req,res,next){
    var name=req.body.name;
    var role=req.body.role;
    var username=req.body.username;
    var password=req.body.password;
    var myobj=[];
    var collection = mongoose.connection.db.collection("Faculty");
                    myobj.push({
                        
                        "Name":name,
                        "Role":role,
                        "Username":username,
                        "Password":password,
                        "DOB":'',
                        "Address":'',
                        "Gender":'',
                        'Phone Number':'',
                        'Email':'',
                        "Year of Joining":'',
                        "Blood Group":"",
                        "Qualifications":[],
            
                    });
                collection.insertMany(myobj, function(err, response) {
                    if (err) res.json("Oops");
                    else    res.json("Hurray");
                  });
                            
        });

//delete faculty
router.delete("/deleteFaculty/:id",function(req,res,next){
    console.log("Staff to be deleted: "+req.params.id)
    var ObjectID = require('mongodb').ObjectID;
    var collection = mongoose.connection.db.collection("Faculty");
    collection.remove({"_id":new ObjectID(req.params.id)},function(err,result){
        if(err){
            console.log("Delete Staff Error:  "+err)
            res.send("Oops");
        }
        else{
            res.send("Hurray");
        }
    })

});

//createBlog

router.post('/createPage', function(req,res,next){
    var mxians=req.body.mxians.toLowerCase();
    mongoose.connection.db.createCollection(mxians+"Page",function(err){
        if(!err)
        {
            res.json('Hurray');
        }
        else
        {
            res.json('OOPS');
        }
    })
})


//delete blog

router.delete('/deletePage',function(req,res,next){
    var mxians=req.body.mxians.toLowerCase()+"Page";
    var collection = mongoose.connection.db.collection(mxians);
    collection.drop({},function(err,result){
        if(err){
            console.log("Delete Page Error:  "+err)
            res.send("Oops");
        }
        else{
            res.send("Hurray");
        }
    })

    

});



router.post('/adminlogin', (req,res)=>{
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
              admin.findOne({username:req.body.username.toLowerCase()}, function(err,user){
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
  
    
router.post('/addAdmin',function(req,res){
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
            let user = new admin({
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
    

})

//for profile

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
  
   router.get('/adminprofile', (req,res)=>{
       admin.findOne({ _id : req.decoded.userId}).select('username').exec((err,user)=>{
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