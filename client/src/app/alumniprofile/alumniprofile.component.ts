import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'
import { NgFlashMessageService } from 'ng-flash-messages';
import { NavbarService } from '../services/navbar.service';
import {
  FileSelectDirective,
  FileDropDirective,
  FileUploader
} from "ng2-file-upload";

const URL = 'http://localhost:3000/alumni/uploadPhoto';

const path = 'http://localhost:3000/alumni/public/uploads';


@Component({
  selector: 'app-alumniprofile',
  templateUrl: './alumniprofile.component.html',
  styleUrls: ['./alumniprofile.component.css']
})
export class AlumniprofileComponent implements OnInit {

  constructor( private authService:AuthService , private router : Router, private flash : NgFlashMessageService, public nav : NavbarService) {
    this.uploader = new FileUploader({ url: URL, itemAlias: "photo" });
 
   }

  username;
  email;
  profile:boolean;
  uploader : FileUploader;
  alumni;
  alum = [];
  updated:boolean;
  newAlum={};
  urldata:string;
  imgurl:string;
  blog:boolean;
  fileSelected:File;
  chat : boolean;
  local;
  value : boolean;
  ngOnInit() {
    this.nav.hide();
    this.username=localStorage.getItem('user');
    this.getDetails();
    this.blog=true;
    this.profile=false;
    this.updated=false;
    this.chat=false;
    this.authService.getAlumniProfile().subscribe(data=>{
        this.username = data['user'].username;
        this.email = data['user'].email;
    })
     this.local = localStorage.getItem('user');
     if(this.local == null)
     {
       this.value = true;
     }
     this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      window.document.getElementById("uploadimage").style.visibility="visible"
    };
    this.uploader.onCompleteItem = (
      item: any,
      res: any,
      status: any,
      headers: any
    ) => {
      //console.log(res);
      this.urldata = res;
      this.imgurl = path + "/" + res;
       this.alum[0].photo=this.imgurl;
       this.authService.alumni.photo=this.imgurl;
     // console.log(this.imgurl);
    };
    
  }
 
  showBlog()
  {
    this.blog=true;
    this.profile=false;
    this.getDetails();
    this.chat=false;
  }
  showProfile()
  {
    this.profile=true;
    this.getDetails();
    this.blog=false;
    this.chat=false;
  }
  showChat()
  {
    this.chat=true;
    this.getDetails();
    this.profile=false;
    this.blog=false;
  }
  Logout()
  {
    this.authService.logout();
    this.flash.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: ["Logged Out"], 
      // Whether the flash can be dismissed by the user defaults to false
      dismissible: true, 
      // Time after which the flash disappears defaults to 2000ms
      timeout: false,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: 'info'
    });
    
    this.router.navigate(['/alumnilogin'])
  }
  
  getDetails()
  {
    const user={
      username:this.username
    }
    //console.log(this.imgurl);
   // console.log(this.username);
    this.authService.getdetails(user).subscribe((res)=>{
    // console.log(res);
        this.alum.push(res);
        this.authService.alumni={
          photo:this.alum[0].photo,
          email : this.alum[0].email,
          name : this.alum[0].name,
          username : this.alum[0].username,
          password : this.alum[0].password,
          gender : this.alum[0].gender,
          batch : this.alum[0].batch,
          rollno : this.alum[0].rollno,
          phoneno : this.alum[0].phoneno,
          currentlyworking : this.alum[0].currentlyworking
          //professionalstory : this.alum[0].professionalstory
        }
    })
  }

  updateDetails( user : string, pwd : string, name : string, mail : string, roll : string, batch : string, gender :string, current :string, phone : string )
  {
    window.document.getElementById("selectImage").style.visibility="hidden"
    window.document.getElementById("uploadimage").style.visibility="hidden"
    window.document.getElementById("updateInfo").style.visibility="hidden" 

    this.newAlum = {
      "photo":this.imgurl,
      "username":user,
      "password":pwd,
      "name":name,
      "email":mail,
      "rollno":roll,
      "batch":batch,
      "phoneno":phone,
      "gender":gender,
      "currentlyworking":current
    }
    //this.getDetails();
    const updateUser = {
      username:this.username,
      value : this.newAlum
    }
    window.document.getElementById("selectImage").style.visibility="hidden"
    window.document.getElementById("uploadimage").style.visibility="hidden"
    window.document.getElementById("updateInfo").style.visibility="hidden" 
    this.authService.updatedetails(updateUser).subscribe((res)=>{
    
      this.updated=true;
      setTimeout(()=>{
        this.updated=false
      },1000)
      window.document.getElementById("editInfo").style.visibility="visible"
     ;
      var inputs=window.document.getElementsByTagName('input');
     for(let i=1;i<inputs.length;i++){
  
    inputs[i].disabled=true;
    }   
    var selects=window.document.getElementsByTagName('select');
    for(let i=0;i<selects.length;i++){
      selects[i].disabled=true;
      }   
      }
    
    )
    this.getDetails();
  }

  setUpdateVisible()
  {

   window.document.getElementById("updateInfo").style.visibility="visible" 
    window.document.getElementById("editInfo").style.visibility="hidden" 
    window.document.getElementById("selectImage").style.visibility="visible"

    var inputs=window.document.getElementsByTagName('input');
     for(let i=1;i<inputs.length;i++){
  
      inputs[i].disabled=false;
    }   
    var selects=window.document.getElementsByTagName('select');
    for(let i=0;i<selects.length;i++){
      selects[i].disabled=false;
      }   
    
  }

}
