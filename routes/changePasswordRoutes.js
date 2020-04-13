var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var code;


function mailsend(userDetail){

    code =Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
        
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  //true for 465 port, false for other ports
        auth: {
          user: 'mxiansportal@gmail.com',
          pass: '18mxians'
        }
      });
               
      const mailOptions = {
        from: 'mxiansportal@gmail.com', // sender address
        to: userDetail.Mail, // list of receivers
        subject: "MXIANS' Portal - Forgot Your Password ?", // Subject line
        html:"<h4> Hai "+userDetail.Name+" Forgot Your Password? No Worries, We have got you recovered.</h4> <h2> <br> This is your Code "+code+"</h2> <br><h5><i>If you didn't make this request, or made it by mistake, please ignore this mail. Your Password will remain as it was.</h5></i>"
    };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
             console.log(error);
             //  res.status(400).send(error);
        } else {
             console.log('Success');
             // res.status(200).send(info);
        }
      });
    
    

}


router.post('/student', (req,res)=>{
    //const 

    const mxians = req.body.batch;
    const rollno = req.body.rollno;
    const mail = req.body.email;
  
    var collection= mongoose.connection.db.collection(mxians);
    collection.findOne({ 'Roll_No':rollno }, (err,doc)=>{
        if(err)
            res.json({success : false, message : "Error in retrieving student details"});
        else    
        {
           if(!doc)
           {
            res.json({success : false, message : "Wrong Roll No"});
           } 
           else
           {
                if(doc.Email === mail )
                { 
                   let user={
                       "Name":doc.Name,
                       "Mail":doc.Email
                   }
                   res.json({success : true, message : "Please Check your Mail Inbox and Enter the Code below"});
                   mailsend(user);  
                }
                else
                {
                    res.json({success : false, message : "Mail not Found"});
                }
           }
           
           
            
        }
       
            
    })
})

router.post('/student/code', (req,res)=>{
    const receivedcode= req.body.code;
    if(receivedcode==code)
    {
        console.log("code Matched");
        res.json({success:true , message : "Code Matched. Please Enter your New Password below"})
    }
    else
    {
        console.log("code mismatched");
        res.json({success:false , message : "Code Mismatched"})
    }
});

router.post('/student/code/changePassword', (req,res)=>{

    const mxians = req.body.batch;
    const rollno = req.body.rollno;
    const mail = req.body.mail;
    const password = req.body.password;
    var collection= mongoose.connection.db.collection(mxians);
    collection.findOne({'Roll_No':rollno}, (err,doc)=>{
        if(err)
        {
            res.json({success : false, message : "Error in Initiating Password Change"});
        }
        else
        {
            collection.update({'Roll_No':rollno},{$set : {'Password': password}}, (error,result)=>{
                if(error)
                {
                    res.json({success : false, message : "Error in Changing Password"});
                }
                else
                {
                    res.json({success : true, message : "Password Changed"});
                }
            })
        }
    })



})




module.exports=router;
