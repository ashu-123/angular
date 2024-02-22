import { Injectable } from "@angular/core";
import { CoreModule } from "./core.module";

import { User, UserManager } from "oidc-client";
import { Constants } from "../constants";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {

    private _userManager: UserManager;
    private _user: User;
    private _loginChangedSubject = new Subject<boolean>();

    loginChanged = this._loginChangedSubject.asObservable();

    constructor() { 
        const stsSettings = {
            authority: Constants.stsAuthority,
            client_id: Constants.clientId,
            redirect_uri: `${Constants.clientRoot}signin-callback`,
            scope: 'openid profile projects-api',
            response_type: 'code',
            post_logout_redirect_uri: `${Constants.clientRoot}signout-callback`,
            automaticSilentRenew: true,
            silent_redirect_uri: `${Constants.apiRoot}assets/silent-callback.html`
        }
        this._userManager = new UserManager(stsSettings);
        this._userManager.events.addAccessTokenExpired(_=> this._loginChangedSubject.next(false));
    }

    login() {
        return this._userManager.signinRedirect();
    }

    isLoggedIn(): Promise<boolean> {
        return this._userManager.getUser().then(user => {
            const currentUser = !!user && !user.expired;
            if(this._user !== user) {
                this._loginChangedSubject.next(currentUser);
            }
            this._user = user;
            return currentUser;
        })
    }

    completeLogin(): Promise<User> {
        return this._userManager.signinRedirectCallback().then(user => {
            this._user = user;
            this._loginChangedSubject.next(!!user && !user.expired);
            return user;
        })
    }

    logout() {
        this._userManager.signoutRedirect();
    }

    completeLogout() {
        this._user = null;
        this._loginChangedSubject.next(false);
        return this._userManager.signoutRedirectCallback();
    }

    getAccessToken() {
        return this._userManager.getUser().then(user => {
            if(!!user && !user.expired) {
                return user.access_token;
            }
            else {
                return null;
            }
        })
    }
}