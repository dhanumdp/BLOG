const mongoose=require('mongoose');

const Schema=mongoose.Schema;

let titleLengthChecker=(title)=>{
    if(!title){
        return false;
    }
    else{
        if(title.length<5 || title.length>30){
            return false;
        }
        else{
            return true;
        }
    }
};
const titlevalidators=[{
    validator:titleLengthChecker,
    message:'Title must be more than 5 characters but not more than 30'
}];
 
let bodyLengthChecker=(body)=>{
    if(!body){
        return false;
    }
    else{ 
        if(body.length<5 || body.length>1000){
            return false;
        }
        else{
            return true;
        }
    }
};
const bodyvalidators=[{
    validator:bodyLengthChecker,
    message:'Body must be more than 5 characters but not more than 500'
}];

let commentLengthChecker=(comment)=>{
    if(!comment[0]){
        return false;
    }
    else{
        if(comment[0].length<1 || comment[0].length>200){
            return false;
        }
        else{
            return true;
        }
    }
};
const commentvalidators=[{
    validator:commentLengthChecker,
    message:'comment must be more than 1 characters but not more than 200'
}];

   const blogSchema= new Schema({
    title:{type:String,required:true,validate:titlevalidators},
    body:{type:String,required:true,validate:bodyvalidators},
    image:{data:Buffer,type:String},
    createdBy:{type:String},
    createdAt:{type:Date,default:Date.now()},
    file : {type : String}
});


Blog = mongoose.model('blog',blogSchema);

module.exports = { Blog }; 
