import { NgModule } from '@angular/core';
import { AccountService } from './account.service';
import { ProjectService } from './project.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { AuthService } from './auth-service.component';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
    AccountService,
    AuthService,
    ProjectService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
})
export class CoreModule { }
