import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthorizationService, public router: Router) {}

    canActivate(): boolean {
        if (!this.auth.hasAuthorization()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
