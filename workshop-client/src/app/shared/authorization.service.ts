
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthorizationService {

    public login: string = null;
    private password: string = null;
    private authenticator: Object = null;
    private role: string = null;

    public authorized$ = new Subject<boolean>();

    constructor() {
        this.restoreAuthorization();
    }

    public isAdmin(): boolean {
        this.restoreAuthorization();
        console.log(this.authenticator);
        console.log(this.role);

        return this.login !== null && this.password !== null && this.role == "ADMIN";
    }

    public hasAuthorization(): boolean {
        return this.login !== null && this.password !== null;
    }

    public setAuthorization(login: string, password: string, role: string): void {
        this.login = login;
        this.password = password;
        if (role == "ADMIN") {
            console.log('Admin');
            this.role = role;
        }
    }

    public storeAuthorization(authenticator: Object, local: boolean) {
        this.authenticator = authenticator;

        let authorization = {
            login: this.login,
            password: this.password,
            role: this.role,
            authenticator: this.authenticator
        };

        let authorizationString = JSON.stringify(authorization);
        let storage = local ? localStorage : sessionStorage;

        storage.setItem('authorization', authorizationString);

        this.authorized$.next(true);
    }

    private restoreAuthorization(): void {

        let authorizationString = sessionStorage.getItem('authorization');

        if (authorizationString === null) {
            authorizationString = localStorage.getItem('authorization');
        }

        if (authorizationString !== null) {
            let authorization = JSON.parse(authorizationString);

            this.login = authorization['login'];
            this.password = authorization['password'];
            this.role = authorization['role'];
            this.authenticator = authorization['authenticator'];

            this.authorized$.next(true);
        }
    }

    public deleteAuthorization(): void {

        this.login = null;
        this.password = null;
        this.authenticator = null;

        sessionStorage.removeItem('authorization');
        localStorage.removeItem('authorization');

        this.authorized$.next(false);
    }

    public createAuthorizationString(): string {
        return 'Basic ' + btoa(this.login + ':' + this.password);
    }

    public getAuthenticator(): Object {
        return this.authenticator;
    }

    public setAuthenticator(authenticator: Object): void {
        this.authenticator = authenticator;
    }

}
