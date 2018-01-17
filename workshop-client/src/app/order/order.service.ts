import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApiService } from "../shared/api.service";
import { Order } from "./order";
import {Product} from "../product/product";
import {User} from "../user/user";
import {Router} from "@angular/router";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";

@Injectable()
export class OrderService {

    feedbackString: string = "";

    constructor(private api: ApiService, private router: Router,
                private shoppingBasketService: ShoppingBasketService) {
    }

    public getAll(): Observable<Order[]> {
        return this.api.get<Order[]>('orders');
    }

    public getMyOrders(): Observable<Order[]> {
        return this.api.get<Order[]>('orders/me');
    }

    public deleteOrder(orderNr: number) {
        this.api.delete<void>('orders/'+orderNr)
            .subscribe(
                (response) => this.feedbackString = "",
                (error) => this.feedbackString = "Bestelling kon niet geannuleerd worden, " +
                    "neem contact op met de klantenservice"
            );
    }

    public addOrder(products: Product[]) {
        let data = [];

        for (let i = 0; i < products.length; i++) {
            let product = products[i];

            data[i] = {
                barcode: product.barcode,
                artist: product.artist,
                title: product.title,
                price: product.price,
                year: product.year,
                quantity: product.quantity
            };

        }

        this.api.post<void>('orders', data).subscribe(
            data => {
                this.shoppingBasketService.empty();
                this.router.navigate(['/bestelling-afgerond']);
            },
            error => {
                this.feedbackString = "Het bestellen is mislukt, neem contact op met de klantenservice"
            }
        );
    }

}
