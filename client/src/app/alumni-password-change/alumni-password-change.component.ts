import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router'
import { AlumnipasswordchangeService } from '../services/alumnipasswordchange.service';


@Component({
  selector: 'app-alumni-password-change',
  templateUrl: './alumni-password-change.component.html',
  styleUrls: ['./alumni-password-change.component.css']
})
export class AlumniPasswordChangeComponent implements OnInit {

  message;
  message1;
 loading : boolean;
  message2;
  col=[];
  form : FormGroup;
  form1 : FormGroup;
  form2 : FormGroup;

  codeGot : boolean;
  getC : boolean;
  codeVerified :boolean;

  constructor( private formBuilder : FormBuilder, private alumniPasswordService :AlumnipasswordchangeService , private router : Router) { }



  ngOnInit() {
    this.createForm();
    this.codeGot=false;
    this.getC=true;
    this.loading=false;
    this.codeVerified=false;
  }


  createForm()
   {
     this.form = this.formBuilder.group({
      
       username: ['', Validators.compose([
         Validators.required
    
       ])],
       email: ['', Validators.compose([
        Validators.required
   
      ])],
     })

     this.form1 = this.formBuilder.group({
       code : ['', Validators.compose([
         Validators.required
       ])]
     })

     this.form2 = this.formBuilder.group({
      newPass : ['', Validators.compose([
        Validators.required
      ])]
    })
   }

   getCode(form)
   {
      let data={
        
        username : this.form.get('username').value,
        email :this.form.get('email').value.toLowerCase()
      }
     this.alumniPasswordService.getCode(data).subscribe((result)=>{
         if(!result['success'])
         {
           this.message=result['message'];
         }
         else
         {
          
          this.message=result['message'];
          this.codeGot=true;

         }
     })
   }

   verifyCode(form1)
   {
      let data ={
        code : this.form1.get('code').value
      }
      
      this.alumniPasswordService.verifyCode(data).subscribe((result)=>{

        if(!result['success'])
        {
          this.message1=result['message']
        }
        else
        {
          this.message1=result['message'],
          this.getC=false;
          this.codeVerified=true;
          this.form.controls['username'].disable();
          this.form.controls['email'].disable();
         
          this.form1.controls['code'].disable();
        }

      })
   }

   changePassword(form,form2)
   {
     let data={
       
        username : this.form.get('username').value.toUpperCase(),
        password : this.form2.get('newPass').value
     }

     this.alumniPasswordService.changePassword(data).subscribe((result)=>{
       if(!result['success'])
       {
         this.message2=result['message']
       }
       else
       {
         this.message2=result['message'];
         this.codeGot=false;
         this.form2.controls['newPass'].disable();
         this.loading=true;
          setTimeout(()=>{
            this.router.navigate(['/alumnilogin'])
          },2000)
       }
     })
   }






}
