var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');



var c=[];

router.get('/getGroups', (req,res)=>{
    mongoose.connection.db.listCollections().toArray(function(err,coll){
        if(err) console.log(err);
    //iterate to each collection detail and push just name in array
    coll.forEach(col => {
        if(col.name.length==13)
        {
            const regExp = new RegExp(/^[0-9][0-9]*[a-z]{0,11}?/); //
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


module.exports=router;