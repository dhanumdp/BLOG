import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NavbarService} from '../services/navbar.service'
import { FacultyService } from '../services/faculty.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-facultylogin',
  templateUrl: './facultylogin.component.html',
  styleUrls: ['./facultylogin.component.css']
})
export class FacultyloginComponent implements OnInit {
  form : FormGroup;
  processing = false;
  message;
  messageclass;
  constructor(private formBuilder : FormBuilder, public nav : NavbarService,private facultyService : FacultyService, private router : Router
   ) {
    this.createForm();
   }
   ngOnInit() {
    this.nav.show();
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
    //console.log(this.form);
    this.disableForm();
    const user={
      Username:this.form.get('username').value,
      Password:this.form.get('password').value
    }
    this.facultyService.login(user).subscribe(data=>{
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
          this.facultyService.storeUserData(data['token'],data['user']);
          this.router.navigate(['/facultyprofile']);
        }
      }
    }) 
   }
  

  disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();

  }
  enableform(){
   this.form.controls['username'].enable();
   this.form.controls['password'].enable();
  }

}
