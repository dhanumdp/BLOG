import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router'
import {StudentService} from '../services/student.service'
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

  constructor(private formBuilder : FormBuilder
   ) {
    this.createForm();
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
   
   
   onRegisterSubmit()
   {
    console.log(this.form);
  this.processing=true;
  this.disableForm();

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
  }

}