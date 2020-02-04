import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
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
