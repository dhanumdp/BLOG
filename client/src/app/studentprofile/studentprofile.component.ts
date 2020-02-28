import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {StudentService}  from '../services/student.service'

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  constructor( private studentService : StudentService, private router : Router) { }

 
  username;
  batch;


  ngOnInit() {
  this.username = this.studentService.getRollno();
  this.batch = this.studentService.getBatch();
  const user={
    mxians:this.batch,
    rollno:this.username
  }
  //console.log(user);
  this.studentService.getdetails(user).subscribe(res  =>{
    console.log(res);
  })

  }
 

  Logout()
  {
    this.studentService.logout();
    this.router.navigate(['/studentlogin'])
  }
}
