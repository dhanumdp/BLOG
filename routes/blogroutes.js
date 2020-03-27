const Blog=require('../models/blog');
const mongoose = require('mongoose');
const multer=require('multer');
var express = require ('express');
var router = express.Router();

    router.post('/newPost',(req,res)=>{
        var mxians = req.body.mxians+"Page";
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
                    createdBy:req.body.createdBy
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
                     //console.log("Im from blog");
                 }
                })
                // blog.save((err)=>{
                //     if(err)
                //        {
                //         if(err.errors){
                //             if(err.errors.title){
                //                 res.json({success:false,message:err.errors.title.message});
                //             }else{
                //                 if(err.errors.body){
                //                     res.json({success:false,message:err.errors.body.message});
                //                 }else{
                                    
                //                         res.json({success:false,message:err.errmsg});
                //                     }
                //             }
                //         }else{
                //             res.json({success:false,message:err});
                //         }
                //     }else{
                //         res.json({success:true,message:'Blog Saved'});
                //         console.log("Im from blog");
                //     }
                // });
            }
            }
        }
    });
    router.get('/getPosts',(req,res)=>{
        Blog.find({},(err,blog)=>{
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
        }).sort({'_id':-1});

    });
   router.get('/getPost/:id',(req,res)=>{
       if(!req.params.id){
           res.json({success:false,message:'No blog was provided.'});
       }else{
          Blog.findOne({_id:req.params.id},(err,blog)=>{
              if(err){
                  res.json({success:false,message:'Not a valid blog id'});
              }else{
                  if(!blog){
                      res.json({success:false,message:'Blog not found'});
                  }else{
                    res.json({success:true,blog:blog});
    }

}
              });
            }
            });
   
   router.put('/updatePost',(req,res)=>{
       if(!req.body._id){
           res.json({success:false,message:'No blog id provided'});
       }
       else{
        Blog.findOne({_id:req.body._id},(err,blog)=>{
            if(err){
                res.json({success:false,message:'Not a valid blog id'});
            }else{
                if(!blog){
                    res.json({success:false,message:'Blog not found'});
                }else{
                    console.log('im inside get');
                                    blog.title=req.body.title;
                                    blog.body=req.body.body;
                                    blog.save(err);
                                    if(err){
                                        res.json({success:false,message:err});

                                    }
                                    else{
                                        res.json({success:true,message:'  Blog Updated'});
                                    }


                                }
                            }
                        });
                    }
                   
                });
            router.delete('/deletePost/:id',(req,res)=>{
                    if(!req.params.id)
                    {
                        res.json({success:false,message:'No id provided'});
                    }else{
                        Blog.findOne({_id:req.params.id},(err,blog)=>{
                            if(err)
                            {
                                res.json({success:false,message:'Invalid id'});
                            }else{
                                if(!blog)
                                {
                                    res.json({success:false,message:'Blog not found'});
                                }else{
                                    if(Login.findOne({_id:req.decoded.userId},(err,Login)=>{
                                        if(err){
                                            res.json({success:false,message:err});
                                        }
                                        else{
                                            if(!Login)
                                            {
                                                console.log(Login);
                                                res.json({success:false,message:'Unable to authenticate'});
                                            }else{
                                                if(Login.username!=blog.createdBy){
                                                    res.json({success:false,message:'You are not authorized to delete this'});
                                                }
                                                else{
                                                    blog.remove((err)=>{
                                                        if(err)
                                                        {
                                                            res.json({success:false,message:err});
                                                        }
                                                        else{
                                                            res.json({success:true,message:'Blog Deleted'});
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    }));
                                }
                            }
                        });
                    }
                });
         
                module.exports=router;

