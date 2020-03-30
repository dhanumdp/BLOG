import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './studentprofile/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { FacultyloginComponent } from './facultylogin/facultylogin.component';
import { AlumniloginComponent } from './alumnilogin/alumnilogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';

import { AlumniprofileComponent } from './alumniprofile/alumniprofile.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { BlogComponent } from './blog/blog.component';
import { ChatComponent } from './chat/chat.component';
import { FacultyprofileComponent } from './facultyprofile/facultyprofile.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './blog/delete-blog/delete-blog.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
{ path:'home',
component:HomeComponent
},
{
  path:'studentprofile/dashboard',
  component:DashboardComponent
},
{
  path:'registerAlumni',
  component:RegisterComponent
},

{
  path:'facultylogin',
  component:FacultyloginComponent
},
{
  path:'facultyprofile',
  component:FacultyprofileComponent
},
{
  path:'alumnilogin',
  component:AlumniloginComponent
 
},
{
  path:'adminlogin',
  component:AdminloginComponent
},
{
  path:'alumniprofile',
  component:AlumniprofileComponent
 
},
{
  path:'adminprofile',
  component:AdminprofileComponent
 
},
{
  path:'studentlogin',
  component:StudentloginComponent
},
{
  path:'studentprofile',
  component:StudentprofileComponent
},
{
  path:'blog',
  component:BlogComponent
},
{
  path:'edit-blog/:id',
  component:EditBlogComponent
},
{
  path:'delete-blog/:id',
  component:DeleteBlogComponent
},
{
  path:'chat',
  component:ChatComponent
}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:[]
})
export class AppRoutingModule { }
