import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';
import { FacultyService } from '../services/faculty.service';
import {
  FileSelectDirective,
  FileDropDirective,
  FileUploader
} from "ng2-file-upload";
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';

const URL = 'https://mxiansportal.azurewebsites.net/faculty/uploadPhoto';

const path = 'https://mxiansportal.azurewebsites.net/faculty/public/uploads';
@Component({
  selector: 'app-facultyprofile',
  templateUrl: './facultyprofile.component.html',
  styleUrls: ['./facultyprofile.component.css']
})

export class FacultyprofileComponent implements OnInit {
  

  constructor(private studentService : StudentService,private authService:AuthService, private facultyService:FacultyService , private router : Router, public nav : NavbarService) { 

    this.uploader = new FileUploader({ url: URL, itemAlias: "photo" });
  }
  username;
  email;
  profile:boolean;
  blog:boolean;
  updated:boolean;
  student : boolean;
  alumni:boolean;
  chat : boolean;
  urldata:string;
  imgurl:string;
  uploader : FileUploader;
  local;
  value : boolean;
  alumRes=[];
  alumniNames=[];
  selectedAlumni:string;
  alum=[];
  stud=[];
  messageClass;
  message;
  col=[];

  blood=[
    {"name":"O negative"},
    {"name":"O positive"},
    {"name":"A negative"},
    {"name":"A positive"},
    {"name":"B negative"},
    {"name":"B positive"},
    {"name":"AB negative"},
    {"name":"AB positive"}
  ]
  
  faculty = [];
newFaculty={};

  ngOnInit() {
    this.nav.hide();
    this.blog=true;
    this.profile=false;
    this.chat=false; 
    this.username = this.facultyService.getUsername();
    this.getDetails();
   this.local = localStorage.getItem('user');
   if(this.local == null)
   {
     this.value = true;
   }
   this.uploader.onAfterAddingFile = file => {
    file.withCredentials = false;
    window.document.getElementById("uploadimage").style.visibility="visible"
   
  };
  this.uploader.onCompleteItem = (
    item: any,
    res: any,
    status: any,
    headers: any
  ) => {
    //console.log(res);
    this.urldata = res;
    this.imgurl = path + "/" + res;
     this.faculty[0].Photo=this.imgurl;
     this.facultyService.fac.Photo=this.imgurl;
    //console.log(this.imgurl);
  };
  }

  getDetails()
  {
    //this.username = data['user'].username;
    const user={
      Name:this.username
    }
    this.facultyService.getdetails(user).subscribe(res  =>{
      //console.log(res);
      this.faculty.push(res);
      this.facultyService.fac= 
      {
        Photo:this.faculty[0].Photo,
        Name:this.faculty[0].Name,  
        Role:this.faculty[0].Role,
        Username:this.faculty[0].Username,
        Password:this.faculty[0].Password,
        DOB:this.faculty[0].DOB,
        Address:this.faculty[0].Address,
        Gender:this.faculty[0].Gender,
        Phone_Number:this.faculty[0].Phone_Number,
        Email:this.faculty[0].Email,
        Year_of_Joining:this.faculty[0].Year_of_Joining,
        Blood_Group:this.faculty[0].Blood_Group,
        Qualifications:this.faculty[0].Qualifications
     }
  });
}
  setUpdateVisible(){
    
    window.document.getElementById("updateInfo").style.visibility="visible" 
    window.document.getElementById("editInfo").style.visibility="hidden" 
    window.document.getElementById("selectImage").style.visibility="visible"
    var inputs=window.document.getElementsByTagName('input');
  for(let i=1;i<inputs.length;i++){

    if(i==1)
      inputs[i].disabled=true;

    else
      inputs[i].disabled=false;

    }   
    
    var selects=window.document.getElementsByTagName('select');
    for(let i=0;i<selects.length;i++){
      selects[i].disabled=false;
      }   
  }
  updateDetails(facid : String, pwd : String, name : String, role:String, dob : String, address : String,
  gender : String , email : String,phone : String , yoj : String ,  bloodgrp : String
    )
  {
    //name.value,dob.value, father.value,mother.value, gender.value, email.value, address.value,phone.value,income.value, religion.value,caste.value,blood.value
    //console.log(roll);
    this.newFaculty={
      "Photo":this.imgurl,
      "Name" : name,
      "Role" : role,
      "Username" : facid,
      "Password" : pwd,
      "DOB": dob,
      "Address":address,
      "Gender":gender,
      "Phone_Number":phone,
      "Email":email,
      "Year_Of_Joining":yoj,
      "Blood_Group":bloodgrp,
    }
    const updateUser = {
      Name:this.username,
      value : this.newFaculty
    }
   // console.log(this.newFaculty);
   window.document.getElementById("selectImage").style.visibility="hidden"
    window.document.getElementById("uploadimage").style.visibility="hidden"
    window.document.getElementById("updateInfo").style.visibility="hidden" 


    this.facultyService.updateDetails(updateUser).subscribe(res  =>{
    
     this.updated=true;
     setTimeout(()=>{this.updated=false},1000)
 
      });
      window.document.getElementById("editInfo").style.visibility="visible"
      this.getDetails();
      var inputs=window.document.getElementsByTagName('input');
  for(let i=1;i<inputs.length;i++){
  
    inputs[i].disabled=true;
    }   
    var selects=window.document.getElementsByTagName('select');
    for(let i=0;i<selects.length;i++){
      selects[i].disabled=true;
      }   
    }
  showBlog()
  {
    this.blog=true;
    this.getDetails();
    this.selectedAlumni="";
    this.alumniNames=[];
    this.authService.alumni=null;
    this.student=false;
    this.alumni=false;
    this.profile=false;
    this.chat=false;
  }
  showProfile()
  {
    this.profile=true;
    this.blog=false;
    this.alumni=false;
    this.selectedAlumni="";
    this.alumniNames=[];
    this.authService.alumni=null;
    this.getDetails();
    this.student=false;
    this.chat=false;
  }
  showChat()
  {
    this.chat=true;
    this.profile=false;
    this.student=false;
    this.selectedAlumni="";
    this.alumniNames=[];
    this.authService.alumni=null;
    this.alumni=false;
    this.getDetails();
    this.blog=false;
  }
  showAlumni()
  {
    this.chat=false;
    
    this.profile=false;
    this.getDetails();
    this.alumni=true;
    this.student=false;
    this.blog=false;
    this.facultyService.getAlumniNames().subscribe((res)=>{
     this.alumRes.push(res);
      this.alumRes[0].forEach(element => {
          this.alumniNames.push(element.username);
      });  
    })

  }

  selectAlumni()
  {
     // console.log(this.selectedAlumni);
      const username = this.selectedAlumni;

      this.facultyService.getAlumniDetails(username).subscribe((res)=>{
        //console.log(res);
        this.alum.push(res);
       // console.log(this.alum);
       this.getAlumniDetails();
        //console.log(this.authService.alumni);
        this.alum=[];
    })    
  }

  getAlumniDetails()
  {
    this.authService.alumni={
      photo:this.alum[1].photo,
      email : this.alum[1].email,
      name : this.alum[1].name,
      username : this.alum[1].username,
      password : this.alum[1].password,
      gender : this.alum[1].gender,
      batch : this.alum[1].batch,
      rollno : this.alum[1].rollno,
      phoneno : this.alum[1].phoneno,
      currentlyworking : this.alum[1].currentlyworking
      //professionalstory : this.alum[0].professionalstory
    }
  }

  showStudent()
  {
    this.chat=false;
    this.profile=false;
    this.selectedAlumni="";
    this.alumniNames=[];
    this.authService.alumni=null;
    //this.resetValues();
    this.alumni=false;
 
    this.getDetails();
    this.student=true;
    this.blog=false;

    this.studentService.getCollections().subscribe((doc)=>{
      this.col.push(doc);
     
   //  console.log(doc);
    });

  }

  viewStudent(batch:string,rollno:string)
  {
    
    this.message=""
    let user ={
      batch:batch,
      rollno : rollno.toUpperCase()
    }
    this.facultyService.getStudentDetails(user).subscribe((res)=>{

      if(!res['success'])
      {
          this.messageClass='alert alert-danger';
          this.message=res['message']

      }
      else
      {
        this.stud.push(res['data']);
        // console.log(this.stud);
        this.getStudentDetails();
        this.stud=[];
      }
     
    })
  }


  getStudentDetails()
  {
      this.studentService.stud={
        Photo:this.stud[0].Photo,
        Roll_No : this.stud[0].Roll_No,
        Password : this.stud[0].Password,
        Class_Prefix : this.stud[0].Class_Prefix,
        Batch : this.stud[0].Batch,
        Name : this.stud[0].Name,
        DOB: this.stud[0].DOB,
        Father_Name : this.stud[0].Father_Name,
        Mother_Name : this.stud[0].Mother_Name,
        Gender : this.stud[0].Gender,
        Email : this.stud[0].Email,
        Address : this.stud[0].Address,
        Phone_Number : this.stud[0].Phone_Number,
        Father_Annual_Income : this.stud[0].Father_Annual_Income,
        Religion : this.stud[0].Religion,
        Caste : this.stud[0].Caste,
        Blood_Group : this.stud[0].Blood_Group
      }
  }
  Logout()
  {
    this.facultyService.logout();
    this.selectedAlumni="";
    this.alumniNames=[];
    this.authService.alumni=null;
    this.router.navigate(['/facultylogin'])
  }

  resetValues()
  {
    this.alumRes=[];
    this.alumniNames=[];
    this.alum=[];
    this.authService.alumni=null;
  }



}
