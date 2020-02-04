import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { FacultyloginComponent } from './facultylogin/facultylogin.component';
import { AlumniloginComponent } from './alumnilogin/alumnilogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    StudentloginComponent,
    FacultyloginComponent,
    AlumniloginComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
 
   ReactiveFormsModule, 
 
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
