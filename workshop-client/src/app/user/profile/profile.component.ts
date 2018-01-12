import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../../shared/authorization.service";
import { Router } from "@angular/router";
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    public authenticated: boolean = false;
    public user: User;
    public userName = '';
    public actionDeleteAccount: boolean = false;

    constructor(private authService: AuthorizationService, private router: Router, private userService: UserService) {

        authService.authorized$.subscribe(
            authorized => {
                this.updateAuthentication();
            }
        );

        this.updateAuthentication();

    }

    ngOnInit() {
    }

    private updateAuthentication() {

        this.authenticated = this.authService.hasAuthorization();

        if (!this.authenticated) {
            this.userName = '';

            return;
        }

        let user: User = this.authService.getAuthenticator();
        this.user = user;
        this.userName = user.fullName;
    }

    public openDeleteAccount() {
        this.actionDeleteAccount = true;
    }

    public closeDeleteAccount() {
        this.actionDeleteAccount = false;
    }

    public deleteAccount() {
        this.userService.deleteUser(this.user, true);
    }

}
