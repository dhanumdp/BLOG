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
  local;
  value : boolean;

  ngOnInit() {
    this.nav.hide();
    this.adminService.getAdminProfile().subscribe(data=>{
        this.username = data['user'].username;

    })
    this.local = localStorage.getItem('user');
    if(this.local == null)
    {
      this.value = true;
    }
  }

  Logout()
  {
    this.adminService.logout();
    this.router.navigate(['/adminlogin', {skipLocationChange:"true"}])
  }
}
