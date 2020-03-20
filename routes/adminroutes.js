const admin = require('../models/admin');
const faculty = require('../models/faculty');
const express= require('express');
const jwt = require('jsonwebtoken');
const config= require('../config/db');
const router=express.Router();
const mongoose=require('mongoose');
//create a class
router.post("/createClass",function(req,res,next){
    var mxians=req.body.mxians.toLowerCase();
    var prefix=req.body.prefix.toUpperCase();
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
router.post("/deleteClass",function(req,res,next){
    console.log(req.body);
    mxians : String;
    mxians = req.body.mxians;
    console.log("Class to be deleted: "+mxians)
    var collection = mongoose.connection.db.collection(mxians);
    collection.drop({},function(err,result){
        if(err){
            console.log("Delete Class Error:  "+err)
            res.json("Oops");
        }
        else{
            res.json("Hurray");
        }
    })

});





//delete student
router.post("/deleteStudent",function(req,res,next){
    var mxians=req.body.mxians;
    var rollno=req.body.rollno;
    var collection = mongoose.connection.db.collection(mxians);
  
    collection.remove({"Roll_No":rollno},function(err,result){
        if(err){
            console.log("Delete Student Error:  "+err)
            res.json("Oops");
        }
        else{
            res.json("Hurray");
        }
    })

});


//create new Faculty
router.post("/createFaculty",function(req,res,next){
    var name=req.body.name;
   // var role=req.body.role;
    var username=req.body.username;
    //var password=req.body.password;
    var myobj=[];
    var collection = mongoose.connection.db.collection("Faculty");
    myobj.push({
        "Name":name,
        "Role":'',
        "Username":username,
        "Password":"a",
        "DOB":'',
        "Address":'',
        "Gender":'',
        'Phone_Number':'',
        'Email':'',
        "Year_of_Joining":'',
        "Blood_Group":"",
        "Qualifications":[],
    });
    collection.findOne({'Username':username}, (err,docs)=>{
       if(err)
       {
           console.log(err);
       }
        else if(docs)
        {
           // console.log('Update');
            collection.updateOne({'Username' :username}, { $set:{"Name":name,
            "Role":'',
            "Username":username,
            "Password":"a",
            "DOB":'',
            "Address":'',
            "Gender":'',
            'Phone_Number':'',
            'Email':'',
            "Year_of_Joining":'',
            "Blood_Group":"",
            "Qualifications":[]}},
             { $upsert: true },function(err, result) {
                if(err){
                console.log(err)
                res.json("0")
            }   
            else
            {
                res.json("1")
            }
        });
        }
        else
        {
           // console.log('insert');
            collection.insertMany(myobj, function(err, response) {
                if (err) res.json("Oops");
                else    res.json("Hurray");
              });           
        }
    })
                    
                   
        });

//delete faculty
router.post("/deleteFaculty",function(req,res,next){

    var username = req.body.username
    var collection = mongoose.connection.db.collection("Faculty"); 
    collection.remove({'Username':username},function(err,result){
        if(err){
            console.log("Delete Staff Error:  "+err)
            res.json("Oops");
        }
        else{
            res.json("hurray");
        }
    })
});
//createBlog
router.post('/createPage', function(req,res,next){
    var mxians=req.body.batch;
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



var c=[];

router.get('/getPages', (req,res)=>{
    mongoose.connection.db.listCollections().toArray(function(err,coll){
        if(err) console.log(err);
    //iterate to each collection detail and push just name in array
    coll.forEach(col => {
        if(col.name.length==12)
        {
            const regExp = new RegExp(/^[0-9][0-9]*[a-z]{0,10}?/); //
            if(regExp.test(col.name))
            {
                c.push(col.name);
            } 
        }
    });
    res.json(c);
    coll.forEach(col => {
        c.pop();
     });
    })
   
})



//delete blog
router.post('/deletePage',function(req,res,next){
    var mxians=req.body.page;
    var collection = mongoose.connection.db.collection(mxians);
    collection.drop({},function(err,result){
        if(err){
            console.log("Delete Page Error:  "+err)
            res.json("Oops");
        }
        else{
            res.json("Hurray");
        }
    })

    

});


// //getStudentRollNo

// router.get('/getRollNo',(req,res)=>{
//    // var batch = req.body.mxians;
//     var collection = mongoose.connection.db.collection("18mxians");
//     var documents;
//     //let coll = collection;
//     myobj=[]
// // coll.count().then((count) => {
// //    //for(i =0; i < count ; i++)
// //    //{
// //         collection.find({"Roll_No":"18mx102"},(err,docs)=>{
// //             if(err)
// //                 console.log(err)
// //             else
// //                 console.log(docs);
// //         } )
// //   // }
// // });
// collection.group(
//     {
//       key: { 'Roll_No' : 1 },
//       cond: {},
//       reduce: function ( curr, result ) { },
//       initial: { }
//     }
//  );

//  console.log(collection.aggregate([{$group : {'Roll_No': 1}}]))

//  console.log(myobj)
    
// })


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