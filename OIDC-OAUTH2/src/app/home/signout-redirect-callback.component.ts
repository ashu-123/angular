import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/auth-service.component";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signout-callback',
    template: `<div></div>`
})
export class SignOutRedirectCallbackComponent implements OnInit{

    constructor(private _authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this._authService.completeLogout().then(user => {
            this.router.navigate(['/'], { replaceUrl: true });
        });
    }

}