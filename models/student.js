const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const  studentSchema = new Schema({
    batch:{type:String , required : true},
       Roll_No : {type : String, required:true , unique:true},
     Password : {type : String, required:true }
});

module.exports=mongoose.model('student',studentSchema);