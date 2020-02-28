import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NavbarService} from '../services/navbar.service'
@Component({
  selector: 'app-facultylogin',
  templateUrl: './facultylogin.component.html',
  styleUrls: ['./facultylogin.component.css']
})
export class FacultyloginComponent implements OnInit {
  form : FormGroup;

  constructor(private formBuilder : FormBuilder, public nav : NavbarService
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
    this.nav.show();
  }

}
