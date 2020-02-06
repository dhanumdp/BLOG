import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {Router} from '@angular/router'
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form : FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(private formBuilder : FormBuilder, private authService : AuthService,private router : Router
   ) {
    this.createForm();
   }

   createForm()
   {
     this.form = this.formBuilder.group({
       email: ['', Validators.compose([
         Validators.required,
         Validators.minLength(5),
         Validators.maxLength(30),
         this.validateEmail
       ])],
       username: ['', Validators.compose([
         Validators.required,
         Validators.minLength(3),
         Validators.maxLength(15),
         this.validateUsername

       ])],
       password: ['', Validators.compose([
         Validators.required
    
       ])],
       confirm: ['', Validators.required]
     },{validator:this.matchingPasswords('password','confirm')})
   }
   validateEmail(controls){
    const regExp = new RegExp( /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if( regExp.test(controls.value))
          return null;
        else
        {
          return {'validateEmail':true}
        }
         
   }

   validateUsername(controls)
   {
    const regExp = new RegExp(/^[a-zA_Z0-9]+$/);
    if(regExp.test(controls.value))
      return null;
    else
     return {'validateUsername' : true}
   }
 

   matchingPasswords(password,confirm)
   {
     return (group : FormGroup) => {
       if(group.controls[password].value === group.controls[confirm].value)
       {
         return null;
       }
       else
        return  {'matchingPasswords' : true };
     }
   }

   disableForm()
   {
this.form.controls['email'].disable();
this.form.controls['username'].disable();
this.form.controls['password'].disable();
this.form.controls['confirm'].disable();

   }

   enableForm()
   {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
   }

   
   onRegisterSubmit()
   {
    this.processing = true;
    this.disableForm();
    const user = {
      email : this.form.get('email').value,
      username : this.form.get('username').value,
      password : this.form.get('password').value
    }

    this.authService.registerUser(user).subscribe(data =>{
     
      if(!data['success']){
          this.messageClass='alert alert-danger'
          this.message= data['message'];
          this.processing = false;
          this.enableForm();
      }
      else
      { 
        this.messageClass='alert alert-success'
      this.message= data['message'];
      setTimeout(()=>
      {
        this.router.navigate(['/alumnilogin'])
      },2000)
  
        

      }
      
    } );
   }

  
  ngOnInit() {
  }

}
