import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {NavbarService} from '../../services/navbar.service'
@Component({
  selector: 'app-alumnilogin',
  templateUrl: './alumnilogin.component.html',
  styleUrls: ['./alumnilogin.component.css']
})
export class AlumniloginComponent implements OnInit{
  form : FormGroup;
  processing = false;
  message;
  messageclass;
   

  constructor(private formBuilder : FormBuilder,
    private authService: AuthService,
    private router: Router,
    public nav : NavbarService
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
   
   
   onLoginSubmit()
   {
    

    console.log(this.form);
  this.processing=true;
  this.disableForm();
  const user={
    username:this.form.get('username').value,
    password:this.form.get('password').value
  }
  this.authService.login(user).subscribe(data=>{
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
        this.authService.storeUserData(data['token'],data['user']);
        this.router.navigate(['/alumniprofile']);
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

  ngOnInit() {
    this.nav.show();
  }

}