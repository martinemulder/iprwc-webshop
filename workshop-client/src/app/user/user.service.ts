
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';
import { AuthorizationService } from '../shared/authorization.service';

import { User } from './user';

@Injectable()
export class UserService {

    constructor(private api: ApiService,
        private authService: AuthorizationService,
        private router: Router) {

    }

    public getAll(): Observable<User[]> {
        return this.api.get<User[]>('users');
    }

    public register(user: User): void {
        let data = {
            fullName: user.fullName,
            postcode: user.postcode,
            streetnumber: user.streetnumber,
            emailAddress: user.emailAddress,
            password: user.password
        };

        this.api.post<void>('users', data).subscribe(
            data => {
                this.goHome();
            },
            error => {
                alert('Het registreren is mislukt');
            }
        );
    }

    public edit(user: User) {
        let data = {
            fullName: user.fullName,
            postcode: user.postcode,
            streetnumber: user.streetnumber,
            emailAddress: user.emailAddress,
            password: user.password
        };

        this.api.put<void>('users', data).subscribe(
            data => {
            },
            error => {
                alert('Het aanpassen van de gebruiker is mislukt');
            }
        );
    }

    public login(user: User, remember: boolean): void {

        this.authService.setAuthorization(user.emailAddress, user.password);

        this.api.get<User>('users/me').subscribe(

            authenticator => {
                this.authService.storeAuthorization(authenticator, remember);
                this.authService.setRole(authenticator, remember);
                this.goHome();
            },
            error => {
                alert('Het inloggen is mislukt');
            }
        );
    }

    public deleteUser(user: User, self: boolean) {

        this.api.delete<void>('users/'+user.emailAddress)
            .subscribe(
                (response) => console.log('User successfully deleted.'),
                (error) => console.log('User was not deleted')
            );

        if (self) {
            this.logout();
            this.authService.deleteAuthorization();
        }
    }

    public logout() {
        this.authService.deleteAuthorization();

        this.goHome();
    }

    private goHome() {
        this.router.navigate(['']);
    }

}
