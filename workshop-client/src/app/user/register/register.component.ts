
import { Component } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'user-register-form',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent {

    user: User = new User();
    failedAction: boolean = false;

    constructor(private userService: UserService) {

    }

    public register() {

        if (this.user.fullName != null && this.user.postcode != null && this.user.streetnumber != null &&
            this.user.emailAddress != null && this.user.password != null && this.user.password.length > 7) {
            this.failedAction = false;
            this.userService.register(this.user);
        } else {
            this.failedAction = true;
        }
    }

}
