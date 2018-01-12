import {Component, OnInit} from '@angular/core';
import {Product} from "../product/product";
import {ProductService} from "../product/product.service";
import {AuthorizationService} from "../shared/authorization.service";
import {User} from "../user/user";
import {OrderService} from "../order/order.service";
import {Order} from "../order/order";
import {Router} from "@angular/router";

@Component({
    selector: 'app-shopping-basket',
    templateUrl: './shopping-basket.component.html',
    styleUrls: ['./shopping-basket.component.css']
})

export class ShoppingBasketComponent implements OnInit {

    public authenticated: boolean = false;
    public userName = '';

    public products: Product[];
    public totalPrice: number;

    constructor(private router: Router, public productService: ProductService, private authService: AuthorizationService, private orderService: OrderService) {

        authService.authorized$.subscribe(
            authorized => {
                this.updateAuthentication();
            }
        );

        this.updateAuthentication();

        this.getProductInBasket();
        this.getTotalPrice();
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

        this.userName = user.fullName;
    }

    private getProductInBasket() {

        this.productService.getProductsInBasket().subscribe(
            products => {
                this.products = products;
            }
        );
    }

    private getTotalPrice() {
        let prices = this.products.map((product) => product.price);

        let total = 0;

        for (let i = 0; i < prices.length; i++) {
            let price = prices[i];
            total += (price);
        }
        this.totalPrice = Math.round(total * 100) / 100
    }

    private delete(product: Product) {
        this.productService.deleteFromBasket(product);
    }

    public order(products: Product[]) {
        this.orderService.addOrder(products);
        this.productService.emptyBasket();
        this.goToOrderFeedback();
    }

    private goToOrderFeedback() {
        this.router.navigate(['/bestelling-afgerond']);
    }

}