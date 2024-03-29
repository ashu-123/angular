import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.component';

@Component({
    selector: 'app-unauthorized',
    templateUrl: 'unauthorized.component.html'
})

export class UnauthorizedComponent implements OnInit {
    constructor(private _authService: AuthService) { }

    ngOnInit() { this._authService.logout(); }
}