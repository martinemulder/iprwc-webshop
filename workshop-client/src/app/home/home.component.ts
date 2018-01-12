
import { Component } from '@angular/core';

import { AuthorizationService } from '../shared/authorization.service';

import { User } from '../user/user';
import { Observable } from "rxjs/Observable";
import {Product} from "../product/product";
import {ProductService} from "../product/product.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent {

    public authenticated: boolean = false;
    public userName = '';
    public products: Product[];


    constructor(private authService: AuthorizationService, private productService: ProductService) {

        authService.authorized$.subscribe(
            authorized => {
                this.updateAuthentication();
            }
        );

        this.updateAuthentication();

        this.getProductList();

    }

    private getProductList() {

        this.productService.getAll().subscribe(
            products => {
                this.products = products;
            }
        );
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

    private addToBasket(product: Product) {
        this.productService.addToBasket(product);
    }

}
