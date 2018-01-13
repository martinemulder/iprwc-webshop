import {Injectable} from '@angular/core';
import {Product} from "../product/product";
import {AuthorizationService} from "../shared/authorization.service";
import {ApiService} from "../shared/api.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ShoppingBasketService {

    productsInBasket: Product[] = new Array;

    constructor(private api: ApiService,
                private authService: AuthorizationService,
                private router: Router) {

        this.getFromStorage();

    }

    public add(product: Product) {

        if (product) {
            product.quantity = 1;

            let doubleProduct;
            let newBarcode = product.barcode;
            let products = this.productsInBasket.map((product) => product);

            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                if (product.barcode == newBarcode) {
                    doubleProduct = product;
                }
            }

            if (doubleProduct) {
                doubleProduct.quantity = doubleProduct.quantity + 1;
            } else {
                this.productsInBasket.push(product);
            }
            this.storeProducts();

        } else {
            console.error('Error while adding product!');
        }
    }

    public delete(product: Product) {
        if (product) {
            let products = this.productsInBasket.filter((targetProduct) => targetProduct.barcode != product.barcode);

            this.productsInBasket = products;
            this.storeProducts();
        } else {
            console.error('Error while removing product!');
        }
    }

    public empty() {
        this.productsInBasket = [];
        localStorage.setItem('productsInBasket','');
    }

    public storeProducts() {
        let productsString = JSON.stringify(this.productsInBasket);

        localStorage.setItem('productsInBasket', productsString);
    }

    public getFromStorage() {
        if (localStorage.getItem('productsInBasket')) {
            this.productsInBasket = JSON.parse(localStorage.getItem('productsInBasket'));
        }
    }

    public getAll(): Observable<Product[]> {
        return Observable.of(this.productsInBasket);
    }

    public getTotalPrice() {
        let products = this.productsInBasket.map(product => product);

        let total = 0;

        for (let i = 0; i < products.length; i++) {
            let price = products[i].price * products[i].quantity;
            total += (price);
        }

        return Math.round(total * 100) / 100;
    }

    public getProductCount() {
        let quantities = this.productsInBasket.map((product) => product.quantity);

        let total = 0;

        for (let i = 0; i < quantities.length; i++) {
            let quantity = quantities[i];
            total += (quantity);
        }
        return total;
    }

}
