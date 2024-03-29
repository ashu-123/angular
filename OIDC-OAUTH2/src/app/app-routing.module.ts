import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProjectListComponent } from './projects/project-list.component';
import { ProjectComponent } from './projects/project.component';
import { ContactUsComponent } from './home/contact-us.component';
import { SignInRedirectCallbackComponent } from './home/signin-redirect-callback.component';
import { SignOutRedirectCallbackComponent } from './home/signout-redirect-callback.component';
import { UnauthorizedComponent } from './core/unauthorized.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'projects', component: ProjectListComponent},
    { path: 'project/:projectId', component: ProjectComponent },
    { path: 'signin-callback', component: SignInRedirectCallbackComponent },
    { path: 'signout-callback', component: SignOutRedirectCallbackComponent },
    { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
