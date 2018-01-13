
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {User} from "../user/user";

@Injectable()
export class AuthorizationService {

    public login: string = null;
    private password: string = null;
    private authenticator: Object = null;

    public authorized$ = new Subject<boolean>();

    constructor() {
        this.restoreAuthorization();
    }

    public isAdmin(): boolean {
        this.restoreAuthorization();

        return this.login !== null && this.password !== null && this.getRole() == "ADMIN";
    }

    public hasAuthorization(): boolean {
        return this.login !== null && this.password !== null;
    }

    public setAuthorization(login: string, password: string): void {
        this.login = login;
        this.password = password;
    }

    public setRole(authenticator: User, local: boolean) {
        let storage = local ? localStorage : sessionStorage;
        storage.setItem('role', authenticator.role);
    }

    public getRole() {

        let role = sessionStorage.getItem('role');

        if (role === null) {
            role = localStorage.getItem('role');
        }
        return role;
    }

    public storeAuthorization(authenticator: Object, local: boolean) {
        this.authenticator = authenticator;
        let authorization = {
            login: this.login,
            password: this.password,
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
