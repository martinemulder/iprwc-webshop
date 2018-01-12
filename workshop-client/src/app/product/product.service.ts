import { Injectable } from '@angular/core';
import { ApiService } from "../shared/api.service";
import { AuthorizationService } from "../shared/authorization.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import {Product} from "./product";
import {ArrayObservable} from "rxjs/observable/ArrayObservable";
import "rxjs/add/operator/map";

@Injectable()
export class ProductService {

    productsInBasket: Product[] = new Array;

    constructor(private api: ApiService,
                private authService: AuthorizationService,
                private router: Router) {

        this.getProductsInBasketFromStorage();

    }

    public getAll(): Observable<Product[]> {
        return this.api.get<Product[]>('products');
    }

    public get(id: number): Observable<Product[]> {
        console.log(this.api.get<Product[]>('products/'+id));
        return this.api.get<Product[]>('products/'+id);
    }

    public addToBasket(product: Product) {

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

    public deleteFromBasket(product: Product) {
        if (product) {
            let products = this.productsInBasket.filter((targetProduct) => targetProduct.barcode != product.barcode);

            this.productsInBasket = products;
            this.storeProducts();
        } else {
            console.error('Error while removing product!');
        }
    }

    public emptyBasket() {
        console.log('Empty basket');
        this.productsInBasket = [];
        localStorage.setItem('productsInBasket','');
    }

    public getProductsInBasketFromStorage() {
        if (localStorage.getItem('productsInBasket')) {
            this.productsInBasket = JSON.parse(localStorage.getItem('productsInBasket'));
        }
    }

    public getProductsInBasket(): Observable<Product[]> {
        return Observable.of(this.productsInBasket);
    }

    public getTotalPrice() {
        let prices = this.productsInBasket.map((product) => product.price);

        let total = 0;

        for (let i = 0; i < prices.length; i++) {
            let price = prices[i];
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

    public storeProducts() {
        let productsString = JSON.stringify(this.productsInBasket);

        localStorage.setItem('productsInBasket', productsString);
    }

    public deleteProduct(product: Product): void {

        console.log(product);

        this.api.delete<void>('products/delete/'+product.barcode).subscribe(
            data => {
            },
            error => {
                alert('Product verwijderen mislukt.');
            }
        );

    }

    public editProduct(product: Product): void {

        let data = {
            barcode: product.barcode,
            artist: product.artist,
            title: product.title,
            year: product.year,
            price: product.price
        };

        this.api.post<void>('products/edit', data).subscribe(
            data => {
                console.log(true);
            },
            error => {
                alert('Product aanpassen mislukt.');
            }
        );
    }

}
