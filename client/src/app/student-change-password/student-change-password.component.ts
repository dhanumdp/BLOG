import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StudentpasswordchangeService } from '../services/studentpasswordchange.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-student-change-password',
  templateUrl: './student-change-password.component.html',
  styleUrls: ['./student-change-password.component.css']
})
export class StudentChangePasswordComponent implements OnInit {

  message;
  message1;
 
  message2;
  col=[];
  form : FormGroup;
  form1 : FormGroup;
  form2 : FormGroup;

  codeGot : boolean;
  getC : boolean;
  codeVerified :boolean;
  constructor(private studentService : StudentService, private formBuilder : FormBuilder, private studentPasswordService : StudentpasswordchangeService, private router : Router) { }

  ngOnInit() {
    this.createForm();
    this.codeGot=false;
    this.getC=true;
    this.codeVerified=false;
    this.studentService.getCollections().subscribe((doc)=>{
      this.col.push(doc);
   //  console.log(doc);
    });
  }


  createForm()
   {
     this.form = this.formBuilder.group({
       batch: ['', Validators.compose([
         Validators.required

       ])],
       rollno: ['', Validators.compose([
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

   getCode(batch:string,rollno :string,email ,string)
   {
      let data={
        batch:batch,
        rollno : rollno.toUpperCase(),
        email : email.toLowerCase()
      }
     this.studentPasswordService.getCode(data).subscribe((result)=>{
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
      
      this.studentPasswordService.verifyCode(data).subscribe((result)=>{

        if(!result['success'])
        {
          this.message1=result['message']
        }
        else
        {
          this.message1=result['message'],
          this.getC=false;
          this.codeVerified=true;
          this.form.controls['rollno'].disable();
          this.form.controls['email'].disable();
          this.form.controls['batch'].disable();
          this.form1.controls['code'].disable();
        }

      })
   }

   changePassword(form,form2)
   {
     let data={
        batch : this.form.get('batch').value,
        rollno : this.form.get('rollno').value.toUpperCase(),
        password : this.form2.get('newPass').value
     }

     this.studentPasswordService.changePassword(data).subscribe((result)=>{
       if(!result['success'])
       {
         this.message2=result['message']
       }
       else
       {
         this.message2=result['message'];
         this.codeGot=false;
          setTimeout(()=>{
            this.router.navigate(['/studentlogin'])
          },2000)
       }
     })
   }



   disableForm(){
    
  }
  enableform(){
   this.form.controls['rollno'].enable();
   this.form.controls['email'].enable();
   this.form.controls['batch'].enable();
   this.form1.controls['code'].enable();
   this.form2.controls['password'].enable();
  }

 

  



}
