import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
{ path:'home',
component:HomeComponent
},
{
  path:'dashboard',
  component:DashboardComponent
},
{
  path:'register',
  component:RegisterComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:[]
})
export class AppRoutingModule { }
