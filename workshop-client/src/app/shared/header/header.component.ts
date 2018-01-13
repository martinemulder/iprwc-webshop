
import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthorizationService } from '../authorization.service';
import { User } from "../../user/user";
import {Product} from "../../product/product";
import {ProductService} from "../../product/product.service";
import {ShoppingBasketService} from "../../shopping-basket/shopping-basket.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})

export class HeaderComponent {

    public authenticated: boolean = false;
    public userName = '';

    constructor(private authService: AuthorizationService, private router: Router, public shoppingBasketService: ShoppingBasketService) {

        authService.authorized$.subscribe(
            authorized => {
                this.updateAuthentication();
            }
        );

        this.updateAuthentication();

    }

    private updateAuthentication() {

        this.authenticated = this.authService.hasAuthorization();

        if (!this.authenticated) {
            this.userName = '';

            return;
        }

        let user: User = this.authService.getAuthenticator();

        this.userName = user.fullName;
    }

    public goHome() {
        this.router.navigate(['']);
    }

    public logout() {
        this.authService.deleteAuthorization();

        this.goHome();
    }

    public login() {
        this.router.navigate(['/login']);
    }
}
