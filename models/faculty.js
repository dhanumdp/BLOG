const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const  facultySchema = new Schema({
      Username : {type : String, required:true , unique:true},
     Password : {type : String, required:true }
});

module.exports=mongoose.model('faculty',facultySchema);