const admin = require('../models/admin');
const faculty = require('../models/faculty');
const express= require('express');
const jwt = require('jsonwebtoken');
const config= require('../config/db');
const router=express.Router();
var app=express();
var multer = require('multer');
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
                        "Photo":"assets/images/student_icon.png",
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
                    if (err)  res.json({success:false, message:'Error While Creating Class'})
                    else     res.json({success:true, message:'Class Created Successfully'})
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
            res.json({success:false, message:'Error while Deleting Class'})
        }
        else{
            res.json({success:true, message:'Class Deleted Successfully'})
        }
    })
});





//delete student
router.post("/deleteStudent",function(req,res,next){
    var mxians=req.body.mxians;
    var rollno=req.body.rollno;
    var collection = mongoose.connection.db.collection(mxians);

    collection.find({"Roll_No":rollno}).count((error,num)=>{
        if(num==0)
        {
            res.json({success:false, message:'Student Already Deleted'})
        }
        else
        {
            collection.remove({"Roll_No":rollno},function(err,result){
                if(err){
                    console.log("Delete Student Error:  "+err)
                    res.json({success:false, message:'Error while Deleting Student'})
                }
                else{
                    res.json({success:true, message:'Student Deleted Successfully'})
                }
            })
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
        "Photo":"assets/images/staff_icon.png",
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
        "Blood_Group":""
    });

    collection.find({'Username':req.body.username}).count((err,num)=>{

        if(num != 0 )
        {
            res.json({success:false, message:'Faculty Already Created'})
        }
        else
        {
            collection.insertMany(myobj,(error,docs)=>{
                if(error)
                {
                    res.json({success:false, message:'Error while creating Faculty'})
                }
                else
                    {
                        res.json({success:true, message:'Faculty Created Successfully'})
                    }
            })
        }
    })
                    
                   
        });

//delete faculty

router.post("/deleteFaculty",function(req,res,next){

    var username = req.body.username
    var collection = mongoose.connection.db.collection("Faculty"); 
    collection.find({'Username':username}).count((error,num)=>{
        if(num==0)
        {
            res.json({success:false, message:'Faculty Already Deleted'})

        }
        else
        {
            collection.remove({'Username':username},function(err,result){
                if(err){
                    console.log("Delete Staff Error:  "+err)
                    res.json({success:false, message:'Error While Deleting Faculty'})
                }
                else{
                    res.json({success:true, message:'Faculty Deleted Successfully'})
                }
            })
        }
    })
   
});
//createBlog
router.post('/createPage', function(req,res,next){
    var mxians=req.body.batch;
   
  mongoose.connection.db.listCollections({name:mxians+"Page"}).next((error,info)=>{
      if(info)
      {
        res.json({success:false, message:'Page Already Created'})
      }
      else
      {
        mongoose.connection.db.createCollection(mxians+"Page",function(err){
            if(!err)
            {
                res.json({success:true, message:'Page Created Successfully'})
               
            }
            else
            {
                res.json({success:false, message:'Error While Creating Collection' +err})
            }
        })
      }
  }) 
})


//createGroup
router.post('/createGroup', function(req,res,next){
    var mxians=req.body.batch;
    console.log(mxians);
    mongoose.connection.db.listCollections({name: mxians+"Group"}).next(function(error,info){
        if(info)
        {
            res.json({success:false, message:'Group Already Created'})
        }
        else
        {
            mongoose.connection.db.createCollection(mxians+"Group",function(err){
                if(!err)
                {
                    res.json({success:true, message:'Group Created Successfully'})
                }
                else
                {
                    res.json({success:false, message:'Error while Creating Page'})
                }
            })
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
            res.json({success:false, message:'Error while Deleting Page'})
        }
        else{
            res.json({success:true, message:'Page Deleted Successfully'})
        }
    })
});


//delete group
router.post('/deleteGroup',function(req,res,next){
    var mxians=req.body.page;
    var collection = mongoose.connection.db.collection(mxians);
    collection.drop({},function(err,result){
        if(err){
            console.log("Delete Page Error:  "+err)
            res.json({success:false, message:'Error while Deleting Page'})
        }
        else{
            res.json({success:true, message:'Group Deleted Successfully'})
        }
    })
});




//getStudentRollNo

router.get('/getRollNo',(req,res)=>{
   var batch = req.body.mxians;
    var collection = mongoose.connection.db.collection("18mxians");
    collection.find({}).toArray((err,docs)=>{
   if(err)
            console.log(err)
        else
        {
            //db.student.find({}, {roll:1, _id:0})
            //res.json(docs.find({},{Roll_No : 1, _id : 0}))
            // res.json(docs.filter(d => d.Roll_No));
            res.json(docs);
        }
            
    });

    // collection.find({'Roll_No':1},(err,docs)=>{
    //     if(err)
    //     console.log(err)
    // else
    // {
    //     //db.student.find({}, {roll:1, _id:0})
    //     //res.json(docs.find({},{Roll_No : 1, _id : 0}))
    //     // res.json(docs.filter(d => d.Roll_No));
    //     res.json(docs);
    // }
    // })
        
// coll.count().then((count) => {
   //for(i =0; i < count ; i++)
   //{
        
  // }

// mongoose.connection.db.collection("18mxians").group(
//     {
//       key: { 'Roll_No' : '18MX101'},
//       cond:{ },
//       reduce: function ( curr, result ) { 
//           if(err)
//           {
//             console.log(err);
//           }
//           else
//           {
//               res.send(docs);
//           }
//       },
//       initial: { }
//     }
//  );

//  console.log(collection.aggregate([{$group : {'Roll_No': 1}}]))

//  console.log(myobj)
    

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
                         // const validPassword = user.comparePassword(req.body.password);
                          if(user.password != req.body.password)
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
                photo : "assets/images/admin.jpeg",
                name : "",
                phoneno :"",
                username:req.body.username,
                password:req.body.password
            });
            user.save(function(err){
                
                if(err){
                        if(err.code ===11000)
                             res.json({success:false, message:"Admin Already Created"})
                             
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
                res.json({success:true, message:"Admin Created Successfully!"})
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