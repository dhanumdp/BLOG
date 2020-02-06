var express=require('express');
var app=express();   



app.listen(3000,function(){
    console.log('Server Started at #3000');
});

var mongoose=require('mongoose');
const config = require ('./config/db');
const path = require('path');
mongoose.Promise=global.Promise;
mongoose.connect(config.uri, { useUnifiedTopology: true,useNewUrlParser: true  } ,(err)=>{
    if(err){
        console.log('Could not Connect to database ',err);
    }
    else
    {
        
        console.log('DB Connected ');
    }
}); 

const authentication = require('./routes/authentication');
const bodyParser = require('body-parser');
const cors=require('cors');
app.use(bodyParser.json());
app.use(cors({
    origin : 'http://localhost:4200'
}));
app.use('/authentication',authentication);