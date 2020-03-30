import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AdminservicesService } from '../services/adminservices.service'
import {StudentService} from '../services/student.service'
import { NavbarService } from '../services/navbar.service';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  col={};
pages={};
group={};
  constructor(

   private adminService: AdminservicesService,
   private router : Router,
   private chatService : ChatService,
   private studentService : StudentService,
   public nav : NavbarService
  ) {
    
   }

  username;
  local;
  classCreated:boolean;
  classDeleted : boolean;
  facultyCreated : boolean;
  pageCreated : boolean;
  groupCreated:boolean;
  groupDeleted : boolean;
  studentDeleted : boolean;
  facultyDeleted : boolean ;
  pageDeleted: boolean;
  value : boolean;
  cclass : boolean;
  dclass : boolean;
  cstudent : boolean; //delete student (maathiten)
  cfaculty : boolean;
  dfaculty:boolean;
  cpage : boolean;
  dpage : boolean;
  cgroup:boolean;
  dgroup:boolean;
  ngOnInit() {

   this.getColl();
    this.nav.hide();
    this.classCreated=false;
    this.classDeleted=false;
    this.facultyCreated = false;
    this.pageCreated = false;
    this.studentDeleted = false;
    this.facultyDeleted=false;
    this.pageDeleted = false;
    this.groupCreated=false;
    this.groupDeleted=false;
    
    this.adminService.getAdminProfile().subscribe(data=>{
        this.username = data['user'].username;
    })
    this.local = localStorage.getItem('user');
    if(this.local == null)
    {
      this.value = true;
    }
  }

  getColl()
  {
    
    this.studentService.getCollections().subscribe((doc)=>{
      this.col=doc;
    });


  }

  Logout()
  {
    this.adminService.logout();
    this.router.navigate(['/adminlogin', {skipLocationChange:"true"}])
  }
  createClass()
  {
this.cclass=true;
this.dclass=false;
this.cstudent=false;
this.cfaculty=false;
this.dfaculty=false;
this.cpage=false;
this.dpage=false;
this.cgroup=false;
this.dgroup=false;
  }
  classCreation(mxian : string, prefix : string, sroll : number, eroll : number)
  {
    let Clas={
      mxians:mxian,
      prefix:prefix,
      start:sroll,
      end: eroll,
    }
    this.adminService.createClass(Clas).subscribe((res)=>{
      this.classCreated=true;
      setTimeout(()=>{this.classCreated=false},1000)
    })
  }
  deleteClass()
  {

    this.getColl();
    this.cclass=false;
    this.dclass=true;
    this.cstudent=false;
    this.cfaculty=false;
    this.dfaculty=false;
    this.cpage=false;
    this.cgroup=false;
this.dgroup=false;
    this.dpage=false;
  }
  classDeletion( mxian : String)
  {
   

    let Clas = {
      mxians : mxian
    }
    this.adminService.deleteClass(Clas).subscribe((res)=>{
      this.classDeleted=true;
      setTimeout(()=>{this.classDeleted=false},5000)
      this.getColl();
    })
  }
  deleteStudent()
  {
    this.getColl();
    this.cclass=false;
this.dclass=false;
this.cstudent=true;
this.cfaculty=false;
this.cgroup=false;
this.dgroup=false;
this.dfaculty=false;
this.cpage=false;
this.dpage=false;

  }
  studentDeletion( mxian : string, roll : string)
  {
    let stud = {
      mxians : mxian,
      rollno : roll.toUpperCase()
    }
    this.adminService.deleteStudent(stud).subscribe((res)=>{
      console.log(res);
      this.studentDeleted = true;
      setTimeout(() => {
        this.studentDeleted=false
      }, 1000);
    })

    
  }
  createFaculty()
  {
    this.cclass=false;
    this.dclass=false;
    this.cgroup=false;
this.dgroup=false;
    this.cstudent=false;
    this.cfaculty=true;
    this.dfaculty=false;
    this.cpage=false;
    this.dpage=false;
  }
  facultyCreation(facname : string, facid : number )
  {
    let fac = {
      name :facname,
      username : facid
    }

    this.adminService.createFaculty(fac).subscribe((res)=>{
      this.facultyCreated = true;
      setTimeout(()=>{
        this.facultyCreated=false;
      }, 1000);
    })
  }
  deleteFaculty()
  {
    this.cclass=false;
    this.dclass=false;
    this.cgroup=false;
this.dgroup=false;
    this.cstudent=false;
    this.cfaculty=false;
    this.dfaculty=true;
    this.cpage=false;
    this.dpage=false;
  }
  facultyDeletion( fid : String)
  {
    let fac = {
      username : fid
    }

    this.adminService.deleteFaculty(fac).subscribe((res)=>{
      this.facultyDeleted=true;
      console.log(res);
      setTimeout(()=>{
        this.facultyDeleted=false;
      },1000)
    })
  }
  createPage()
  {
    this.getColl();
    this.cclass=false;
    this.dclass=false;
    this.cstudent=false;
    this.cfaculty=false;
    this.dfaculty=false;
    this.cgroup=false;
    this.dgroup=false;
    this.cpage=true;
    this.dpage=false;
  }

  pageCreation(bat : string)
  {
    let page={
      batch : bat
    }
    this.adminService.createPage(page).subscribe((res)=>{
      this.pageCreated=true;
      setTimeout(()=>{
        this.pageCreated=false;
      },1000)
    })
  }
  deletePage()
  {
    this.adminService.getPages().subscribe((doc)=>{
      this.pages=doc;
   //  console.log(doc);
    });
    this.cclass=false;
    this.dclass=false;
    this.cstudent=false;
    this.cfaculty=false;
    this.dfaculty=false;
    this.cpage=false;
    this.cgroup=false;
this.dgroup=false;
    this.dpage=true;
  }
  pageDeletion(p : String)
  {
    let page = {
      page : p
    }

    this.adminService.deletePage(page).subscribe((res)=>{
      this.pageDeleted = true;
      setTimeout(()=>{
        this.pageDeleted=false;
        this.deletePage();
      },1000)
    })
  }
  createGroup()
  {
    this.getColl();
    this.cclass=false;
    this.dclass=false;
    this.cstudent=false;
    this.cfaculty=false;
    this.dfaculty=false;
    this.cgroup=true;
    this.dgroup=false;
    this.cpage=false;
    this.dpage=false;
  }

  groupCreation(bat : string)
  {
    let page = {
      batch : bat
    }
    this.adminService.createGroup(page).subscribe((res)=>{
      this.groupCreated=true;
      setTimeout(()=>{
        this.groupCreated=false;
      },1000)
    })
  }
  


  deleteGroup()
  {
    this.chatService.getGroups().subscribe((res)=>{
      this.group=res;
    })
    this.cclass=false;
    this.dclass=false;
    this.cstudent=false;
    this.cfaculty=false;
    this.dfaculty=false;
    this.cpage=false;
    this.cgroup=false;
    this.dgroup=true;
    this.dpage=false;
  }

  groupDeletion(p : String)
  {
    let page = {
      page : p
    }

    this.adminService.deleteGroup(page).subscribe((res)=>{
      this.groupDeleted = true;
      setTimeout(()=>{
        this.groupDeleted=false;
        this.deleteGroup();
      },1000)
    })
  }

}
