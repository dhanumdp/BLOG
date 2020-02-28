import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AdminservicesService } from '../services/adminservices.service'
import { NavbarService } from '../services/navbar.service';
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  constructor(

   private adminService: AdminservicesService,
   private router : Router,
   public nav : NavbarService
  ) { }

  username;

  ngOnInit() {
    this.nav.hide();
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
