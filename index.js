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

const alumniRoutes = require('./routes/alumniroutes');
const adminRoutes= require('./routes/adminroutes');
const studentRoutes = require ('./routes/studentroutes');
const bodyParser = require('body-parser');
const cors=require('cors');
app.use(bodyParser.json());
app.use(cors({
    origin : ['http://localhost:4200','*']
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, x-access-token, x-refresh-token, Content-Type, Accept, _id");
    res.header("Access-Control-Expose-Headers", "x-access-token, x-refresh-token");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use('/alumni',alumniRoutes);
app.use('/admin',adminRoutes);
app.use('/student',studentRoutes);