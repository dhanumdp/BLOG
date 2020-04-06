import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router'
import {StudentService} from '../services/student.service'
import {NavbarService} from '../services/navbar.service'
@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {
  form : FormGroup;
  processing = false;
  message;
  messageclass;
  col=[];
  constructor(private formBuilder : FormBuilder, private studentService : StudentService, private router : Router,  public nav: NavbarService
   ) {
    this.createForm();
    //this.checkValidBatch();
    this.studentService.getCollections().subscribe((doc)=>{
      this.col.push(doc);
   //  console.log(doc);
    });
   }
   createForm()
   {
     this.form = this.formBuilder.group({
       username: ['', Validators.compose([
         Validators.required

       ])],
       password: ['', Validators.compose([
         Validators.required
    
       ])],
       batch: ['', Validators.compose([
        Validators.required
   
      ])],
     })
   }
   
  //  checkValidBatch()
  //  {
  //   console.log("hai"); 
  //   console.log(Object.values(this.col).length);
  //   let c = this.form.get('batch').value;
  //    if(this.col['batch']==c)
  //    {
  //      console.log(c);
  //    }
    
  //  }
   
   onRegisterSubmit()
   {
      
 
  this.processing=true;
  this.disableForm();
  const user={
    batch:this.form.get('batch').value,
    username:this.form.get('username').value,
    password:this.form.get('password').value
  }
  this.studentService.login(user).subscribe(data=>{
    if(!data['success'])
    {
      this.messageclass= 'alert alert-danger';
      this.message = data['message'];
      this.processing= false;
      this.enableform();
    }
    else
    {
      {
        this.messageclass= 'alert alert-success';
        this.message = data['message'];
        // this.processing= false;
        this.studentService.storeUserData(data['token'],data['user'], data['batch']);
        this.router.navigate(['/studentprofile']);
      }
    }
  }) 
   }
   disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['batch'].disable();
  }
  enableform(){
   this.form.controls['username'].enable();
   this.form.controls['password'].enable();
   this.form.controls['batch'].enable();
  }
  ngOnInit() {
    this.nav.show();
  }
}