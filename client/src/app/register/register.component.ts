import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form : FormGroup;

  constructor(private formBuilder : FormBuilder
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
   
   onRegisterSubmit()
   {
    

    console.log(this.form);

   }
  ngOnInit() {
  }

}
