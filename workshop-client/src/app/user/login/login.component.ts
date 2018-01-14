
import { Component } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'user-login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {

    user: User = new User();
    remember: boolean = false;

    constructor(public userService: UserService) {

    }

    login() {
        this.userService.login(this.user, this.remember);
    }

}
