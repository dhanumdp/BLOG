import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnilogin',
  templateUrl: './alumnilogin.component.html',
  styleUrls: ['./alumnilogin.component.css']
})
export class AlumniloginComponent implements OnInit{
  form : FormGroup;

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
    
       ])]
     })
   }
   
   
   onRegisterSubmit()
   {
    

    console.log(this.form);

   }
  ngOnInit() {
  }

}
