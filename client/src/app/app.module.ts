import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './studentprofile/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
//import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { FacultyloginComponent } from './facultylogin/facultylogin.component';
import { AlumniloginComponent } from './alumnilogin/alumnilogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { AlumniprofileComponent } from './alumniprofile/alumniprofile.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';

//import { StudentprofileComponent } from './studentprofile/studentprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    //StudentloginComponent,
    FacultyloginComponent,
    AlumniloginComponent,
    AdminloginComponent,
    AlumniprofileComponent,
    AdminprofileComponent,
    StudentloginComponent,
    StudentprofileComponent,
    
   // StudentprofileComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   ReactiveFormsModule, 
 
   NgFlashMessagesModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
