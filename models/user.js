const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email)=>{
     if(!email)
     {
          return false;
     }
     else
     {
          if(email.length<5 || email.length >30 )
               return false;
          else
               return true;
     }
}

let validEmailChecker = (email)=>{
     if(!email)
     {
          return false;   
     }
     else
     {
          const regExp = new RegExp( /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
          return regExp.test(email);
     }
}
const emailValidators = [
     {
          validator:emailLengthChecker,
           message : 'E-Mail must be atleast 5 characters long but no more than 30'
     },
     {
          validator:validEmailChecker,
          message:"must provide a valid email"
     }
]

let usernameLengthChecker=(username)=>{
     if(!username){
          return false;
     }
     else
     {
         if(username.length<3 || username .length >15)
               return false;  
          else
               return true;
     }
}

let validUsername=(username)=>{
     if(!username)
          return false;
     else
     {
          const regExp = new RegExp(/^[a-zA_Z0-9]+$/);
          return regExp.test(username);

     }
}
const usernameValidators=[
     {
          validator : usernameLengthChecker,
          message: "Username must be no less than 3 characters but no more than 15"
     },
     {
          validator:validUsername,
          message:"Username must not have any special characters"
     }
]
const  userScheama = new Schema({
     photo:{type:String},
     email : {type : String, required:true , unique:true, lowercase:true, validate:emailValidators},
     username : {type : String, required:true , unique:true, lowercase:true, validate : usernameValidators},
     password : {type : String, required:true }
});

userScheama.pre('save',function(next)
{
     if(!this.isModified('password'))
          return next();
     bcrypt.hash(this.password, null,null, (err,hash)=>{
          if(err) return next(err);
          this.password=hash;
          next();
     })
});

userScheama.methods.comparePassword= function(password){
    return bcrypt.compareSync(password,this.password);
}


module.exports=mongoose.model('Alumni',userScheama)