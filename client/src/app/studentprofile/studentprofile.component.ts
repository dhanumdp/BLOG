import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {StudentService}  from '../services/student.service'
import {NavbarService} from '../services/navbar.service'
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar'
//import { get } from 'https';
//import {Student} from './student';


@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  constructor( private studentService : StudentService, private router : Router , public nav : NavbarService, private snack : MatSnackBar) { }

 
  username;
  updated : boolean;
  batch;
  value : boolean;
  local;
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
  
student = [];
newStudent={};
  ngOnInit() {
    this.updated=false;
  this.username = this.studentService.getRollno();
  this.batch = this.studentService.getBatch();
  this.nav.hide();
  this.local = localStorage.getItem('user');
  if(this.local == null)
  {
    this.value = true;
  }
  this.getDetails();
  }

  getDetails()
  {
    const user={
      mxians:this.batch,
      rollno:this.username
    }
  
    this.studentService.getdetails(user).subscribe(res  =>{
      
     this.student.push(res);
      //console.log(this.student[0]);
      this.studentService.stud = {
        Roll_No : this.student[0].Roll_No,
        Password : this.student[0].Password,
        Class_Prefix : this.student[0].Class_Prefix,
        Batch : this.student[0].Batch,
        Name : this.student[0].Name,
        DOB: this.student[0].DOB,
        Father_Name : this.student[0].Father_Name,
        Mother_Name : this.student[0].Mother_Name,
        Gender : this.student[0].Gender,
        Email : this.student[0].Email,
        Address : this.student[0].Address,
        Phone_Number : this.student[0].Phone_Number,
        Father_Annual_Income : this.student[0].Father_Annual_Income,
        Religion : this.student[0].Religion,
        Caste : this.student[0].Caste,
        Blood_Group : this.student[0].Blood_Group
        }
        //console.log(this.student);
    // })
  
  });
    
    //console.log(user);
    
  }
  setUpdateVisible(){
    window.document.getElementById("updateInfo").style.visibility="visible" 
    window.document.getElementById("editInfo").style.visibility="hidden" 
    var inputs=window.document.getElementsByTagName('input');
  for(let i=0;i<inputs.length;i++){
    if(i==0 || i>4)
    inputs[i].disabled=false;
    }   
    var selects=window.document.getElementsByTagName('select');
    for(let i=0;i<selects.length;i++){
      selects[i].disabled=false;
      }   
  }
  Logout()
  {
    this.studentService.logout();
    this.student.pop();
    this.router.navigate(['/studentlogin'])
  }
  updateDetails(rollno : String, pwd : String, pre : String, bat:String, name : String, dob : String,
    father : String, mother : String, gender : String , email : String,
    address : String, phone : String , income : String , religion : String,
    caste : String, bloodgrp : String
    )
  {
    //name.value,dob.value, father.value,mother.value, gender.value, email.value, address.value,phone.value,income.value, religion.value,caste.value,blood.value
    //console.log(roll);
    this.newStudent={
      "Roll_No" : rollno,
      "Password" : pwd,
      "Class_Prefix" : pre,
      "Batch" : bat,
      "Name":name,
      "DOB"  : dob,
      "Father_Name":father,
      "Mother_Name":mother,
      "Gender":gender,
      "Email":email,
      "Address":address,
      "Phone_Number":phone,
      "Father_Annual_Income":income,
      "Religion":religion,
      "Caste":caste,
      "Blood_Group":bloodgrp
    }
    const updateUser = {
      mxians:this.batch,
      rollno:this.username,
      value : this.newStudent
    }
    console.log(this.newStudent);
    window.document.getElementById("updateInfo").style.visibility="hidden" 
    this.studentService.updateDetails(updateUser).subscribe(res  =>{
    
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
    
  }
