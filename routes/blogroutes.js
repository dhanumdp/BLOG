const { Blog }=require('../models/blog');
const mongoose = require('mongoose');
const multer=require('multer');
var express = require ('express');
var router = express.Router();
var app = express();

    router.post('/newPost',(req,res)=>{

        var mxians = req.body.mxians;
        if(!req.body.title){
            res.json({successs:false,message:'Blog title is required'});

        }else{
            if(!req.body.body){
                res.json({success:false,message:'Blog body is required'});
            }
            else{
                if(!req.body.createdBy){
                    res.json({success:false,message:'Blog creator is required'});
                }else{

                const blog=new Blog({
                    title:req.body.title,
                    body:req.body.body,
                    createdBy:req.body.createdBy,
                    file : req.body.file
                });    
                var collection = mongoose.connection.db.collection(mxians);
                collection.insert(blog,(err)=>{
                    if(err)
                    {
                     if(err.errors){
                         if(err.errors.title){
                             res.json({success:false,message:err.errors.title.message});
                         }else{
                             if(err.errors.body){
                                 res.json({success:false,message:err.errors.body.message});
                             }else{
                                 
                                     res.json({success:false,message:err.errmsg});
                                 }
                         }
                     }else{
                         res.json({success:false,message:err});
                     }
                 }else{
                     res.json({success:true,message:'Blog Saved'});
                    
                 }
                })
               
            }
            }
        }
    });

    router.get('/getPosts/:page',(req,res)=>{

        var collection=mongoose.connection.db.collection(req.params.page);
        collection.find({}).sort({'_id':-1}).toArray((err,blog)=>{
            if(err)
            {
                res.json({success:false,message:err});

            }else{
                if(!blog){
                    res.json({success:false,message:'No Blog found'});
                }
                else{
                    res.json({success:true,blog:blog});
                }
            }
        })





        // Blog.find({},(err,blog)=>{
        //     if(err)
        //     {
        //         res.json({success:false,message:err});

        //     }else{
        //         if(!blog){
        //             res.json({success:false,message:'No Blog found'});
        //         }
        //         else{
        //             res.json({success:true,blog:blog});
        //         }
        //     }
        // }).sort({'_id':-1});

    });

    router.post('/getPost/:id',function(req,res){
      
   // console.log(user);
        var collection = mongoose.connection.db.collection(req.body.page);
        collection.findOne({ '_id':req.params.id}, (err,doc)=>{
            if(err)
                res.json({success : false, message : "Error in retrieving student details"});
            else    
            {
                //res.json({success : true, message : "Details got succesfully"});
                res.json(doc)
            }
                
        })
})


                router.post('/updatePost',function(req,res){
                    if(!req.body.id){
                        res.json({success:false,message:'No blog id provided'});
                    }
                    else
                        {
                            var collection = mongoose.connection.db.collection(req.body.page);
                            var id=req.body.id;
                            var ObjectID = require('mongodb').ObjectID;
                            var data = {};
                            data=req.body;
                            delete data['id'];
                            collection.updateOne({"_id": new ObjectID(id)},
                            { $set: data},
                            { $upsert: true },
                            function(err, result) {
                                if(err){
                                console.log(err)
                                res.json({success:false, message:"Failed to Update"})
                            }   
                            else
                            {
                                res.json({success:true,message:"Post Updated"})
                            }
                            });
                        }
                })

                router.post('/deletePost/:id', function(req,res){
                        var id = req.params.id;
                    var ObjectID = require('mongodb').ObjectID;
                        var collection = mongoose.connection.db.collection(req.body.page);
                        collection.find({_id: new ObjectID(id)}).toArray((err,doc)=>{
                            if(err)
                                res.json({success : false, message : "Error in Blog"});
                            else    
                            {
                                //res.json({success : true, message : "Details got succesfully"});
                                collection.remove({_id:new ObjectID(id)},(error)=>{
                                    if(error)
                                    {
                                        res.json({success : false, message : "Error in Deleting Post"});
                                    }
                                    else
                                    {
                                        res.json({success : true, message : "Deleted Successfully"})
                                    }
                                })
                            }
                                
                        })
                  })

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
    //console.log("File Received");
    let file = req.file;
    //console.log(file);
    res.send (file.filename);
    //console.log(res);
  }
});

router.get('/public/uploads/:imgurl', (req, res) => {
    res.sendFile(req.params.imgurl, {root: './public/uploads/'});
});

                
             
                   
                module.exports=router;

