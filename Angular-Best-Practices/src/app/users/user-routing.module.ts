import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, },
  { path: 'sign-in', component: SignInComponent, },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
