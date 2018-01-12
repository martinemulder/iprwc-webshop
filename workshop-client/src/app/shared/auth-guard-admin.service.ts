import {Injectable} from '@angular/core';
import {AuthorizationService} from "./authorization.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthGuardAdminService {

    constructor(public auth: AuthorizationService, public router: Router) {
    }

    canActivate(): boolean {
        // if (!this.auth.isAdmin()) {
        //     this.router.navigate(['']);
        //     return false;
        // }
        return true;
    }

}
