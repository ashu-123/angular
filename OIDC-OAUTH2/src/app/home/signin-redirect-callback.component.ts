import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/auth-service.component";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signin-callback',
    template: `<div></div>`
})
export class SignInRedirectCallbackComponent implements OnInit{

    constructor(private _authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this._authService.completeLogin().then(user => {
            this.router.navigate(['/'], { replaceUrl: true });
        });
    }

}