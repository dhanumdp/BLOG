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
const facultyRoutes = require('./routes/facultyroutes');
const blogRoutes = require ('./routes/blogroutes');
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require('body-parser');
const cors=require('cors');
app.use(bodyParser.json());
app.use(cors({
    origin : ['http://localhost:4200','*']
}));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, x-access-token, x-refresh-token, Content-Type, Accept, _id");
//     res.header("Access-Control-Expose-Headers", "x-access-token, x-refresh-token");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });
app.use('/alumni',alumniRoutes);
app.use('/admin',adminRoutes);
app.use('/faculty',facultyRoutes);
app.use('/student',studentRoutes);
app.use('/blog', blogRoutes);
app.use('/chat', chatRoutes);

//chat Module

let http = require('http');

let server = http.Server(app);
server.listen(3001, () => {
    console.log("Chat running in #3001");
   
});

let io = require('socket.io').listen(server);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, x-access-token, x-refresh-token, Content-Type, Accept, _id");
    res.header("Access-Control-Expose-Headers", "x-access-token, x-refresh-token");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


const port = process.env.PORT || 3000;

app.get('',function(req,res){
    
    var collection = mongoose.connection.db.collection(req.body.room);
    collection.find()
})


//For getting time in 12 Hrs Format
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


io.on('connection', (socket) => {

  
 //for getting messages from database

 app.get('/:grp',function(req,res){

   // console.log(req.body.grp);
   var grp = req.params.grp;
    var collection=mongoose.connection.db.collection(grp);
    collection.find({}).toArray((err,docs)=>{
        if(err) console.log("Error in Retrieving Data");
        else 
        {
            
            res.send(docs);
        }
    })
})
   
    
    //For Joining the Room
    socket.on('join', function(data){
        //joining the room
        socket.join(data.room);
        console.log(data.user + ' joined the group ' + data.room);
       var time = new Date;
        //notifies other people belonging to the room that the new user has joined the same room
        socket.broadcast.to(data.room).emit('new user joined',{user : data.user, message : 'has joined this group at '+formatAMPM(time)});        
    })

   //For Sending Notification After Joining the Room 
    // socket.on('notifyUserAfterJoining', function(data){
    //     var time = new Date;
    //     socket.emit('joined grp',{message : 'You Joined '+data.room+' at '+formatAMPM(time)+'.'});
    // })
    //For Leaving the room
    socket.on('leave', function(data){

        //joining the room
        socket.leave(data.room);
        console.log(data.user + ' left the group ' + data.room);

        //notifies other people belonging to the room that the new user has joined the same room
        var time = new Date;
        socket.broadcast.to(data.room).emit('left the group',{user : data.user, message :'has left this group at '+formatAMPM(time) });
    })


    //For Sending Notification After Leaving the Room 
    // socket.on('notifyUserAfterLeaving', function(data){
    //     var time = new Date;
    //     socket.emit('left grp',{message:'You Left'+data.room+' at '+formatAMPM(time)+'.'});
    // })



    //For Sending Message

    socket.on('message', function(data){
        var time = new Date;
        io.in(data.room).emit('new message', {user : '['+formatAMPM(time)+'] '+data.user, message: data.message})

        var collection = mongoose.connection.db.collection(data.room);
        let msg = {
                user : data.user,
                msg : data.message,
                sentTime: formatAMPM(time)
        }
        collection.insertOne( msg, (err,docs)=>
        {
            if(err)
            {
                console.log("Error in Storing Data");
            }
            else
            {
                console.log("Message saved to db");
            }
        }

        )

    })

});

