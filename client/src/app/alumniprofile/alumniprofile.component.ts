import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'
import { NgFlashMessageService } from 'ng-flash-messages';
@Component({
  selector: 'app-alumniprofile',
  templateUrl: './alumniprofile.component.html',
  styleUrls: ['./alumniprofile.component.css']
})
export class AlumniprofileComponent implements OnInit {

  constructor( private authService:AuthService , private router : Router, private flash : NgFlashMessageService) { }

  username;
  email;


  ngOnInit() {
    this.authService.getAlumniProfile().subscribe(data=>{
        this.username = data['user'].username;
        this.email = data['user'].email;

    })
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