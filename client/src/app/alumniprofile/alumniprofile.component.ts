import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'
import { NgFlashMessageService } from 'ng-flash-messages';
import { NavbarService } from '../services/navbar.service';
@Component({
  selector: 'app-alumniprofile',
  templateUrl: './alumniprofile.component.html',
  styleUrls: ['./alumniprofile.component.css']
})
export class AlumniprofileComponent implements OnInit {

  constructor( private authService:AuthService , private router : Router, private flash : NgFlashMessageService, public nav : NavbarService) { }

  username;
  email;
  profile:boolean;
  alumni;
  
  blog:boolean;
  fileSelected:File;
  chat : boolean;
  local;
  value : boolean;
  ngOnInit() {
    this.nav.hide();
    
    this.blog=true;
    this.profile=false;
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
  }
  setVisible(){
    window.document.getElementById("imageFile").style.visibility="visible" 
    window.document.getElementById("editImage").style.visibility="hidden" 
  }
  updateStudentImage(){
    window.document.getElementById("updateImage").style.visibility="hidden"       
    window.document.getElementById("imageFile").style.visibility="hidden"       
    window.document.getElementById("editImage").style.visibility="visible"       
    }

    changeListener(event : any){
      if (event.target.files && event.target.files[0]) {
        this.fileSelected = event.target.files[0]
        var reader = new FileReader();
        reader.onload = (event:any) => {
          window.document.getElementById("updateImage").style.visibility="visible"
          this.alumni = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        event.preventDefault()
      }
    }
  showBlog()
  {
    this.blog=true;
    this.profile=false;
    this.chat=false;
  }
  showProfile()
  {
    this.profile=true;
    this.blog=false;
    this.chat=false;
  }
  showChat()
  {
    this.chat=true;
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

}
