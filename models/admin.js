const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const  adminScheama = new Schema({
     photo : {type : String},
     name :{type : String},
     phoneno : {type : String},
     username : {type : String, required:true , unique:true},
     password : {type : String, required:true }
});

// adminScheama.pre('save',function(next)
// {
//      if(!this.isModified('password'))
//           return next();
//      bcrypt.hash(this.password, null,null, (err,hash)=>{
//           if(err) return next(err);
//           this.password=hash;
//           next();
//      })
// });

// adminScheama.methods.comparePassword= function(password){
//     return bcrypt.compareSync(password,this.password);
// }


module.exports=mongoose.model('admin',adminScheama)