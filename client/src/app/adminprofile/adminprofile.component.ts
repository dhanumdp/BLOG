import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AdminservicesService } from '../services/adminservices.service'
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  constructor(

   private adminService: AdminservicesService,
   private router : Router
  ) { }

  username;

  ngOnInit() {
    this.adminService.getAdminProfile().subscribe(data=>{
        this.username = data['user'].username;

    })
  }

  Logout()
  {
    this.adminService.logout();
    this.router.navigate(['/adminlogin'])
  }
}
