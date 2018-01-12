import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApiService } from "../shared/api.service";
import { Order } from "./order";
import {Product} from "../product/product";

@Injectable()
export class OrderService {

    constructor(private api: ApiService) {
    }

    public getAll(): Observable<Order[]> {
        return this.api.get<Order[]>('orders');
    }

    public deleteOrder(orderNr: number) {
        console.log(orderNr);
        this.api.delete<void>('orders/delete/'+orderNr)
            .subscribe(
                (response) => console.log('Order successfully deleted.'),
                (error) => console.log('Order was not removed')
            );
    }
    public addOrderProduct() {

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
                console.log(true);
            },
            error => {
                alert('Het bestellen is mislukt door een onverwachte fout, neem contact op met de klantenservice.');
            }
        );
    }

}
