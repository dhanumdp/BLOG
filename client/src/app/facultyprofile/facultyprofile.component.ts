import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';
import { FacultyService } from '../services/faculty.service';
import {
  FileSelectDirective,
  FileDropDirective,
  FileUploader
} from "ng2-file-upload";

const URL = 'http://localhost:3000/faculty/uploadPhoto';

const path = 'http://localhost:3000/faculty/public/uploads';
@Component({
  selector: 'app-facultyprofile',
  templateUrl: './facultyprofile.component.html',
  styleUrls: ['./facultyprofile.component.css']
})

export class FacultyprofileComponent implements OnInit {
  

  constructor( private facultyService:FacultyService , private router : Router, public nav : NavbarService) { 

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
    this.getDetails();
    this.student=false;
    this.chat=false;
  }
  showChat()
  {
    this.chat=true;
    this.profile=false;
    this.student=false;
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

  }

  showStudent()
  {
    this.chat=false;
    this.profile=false;
    this.alumni=false;
    this.getDetails();
    this.student=true;
    this.blog=false;

  }
  Logout()
  {
    this.facultyService.logout();
    this.router.navigate(['/facultylogin'])
  }



}
