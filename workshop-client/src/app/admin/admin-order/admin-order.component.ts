import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../order/order.service";
import { Order } from "../../order/order";
import {ProductService} from "../../product/product.service";
import {Product} from "../../product/product";

@Component({
    selector: 'app-admin-order',
    templateUrl: './admin-order.component.html',
    styleUrls: ['./admin-order.component.css']
})

export class AdminOrderComponent implements OnInit {

    public orders: Order[];
    public products: Product[];

    constructor(private orderService: OrderService, private productService: ProductService) {
    }

    ngOnInit() {

        this.getOrderList();
        this.getProductList();

    }

    private getProductList() {

        this.productService.getAll().subscribe(
            products => {
                this.products = products;
            }
        );
    }

    private getOrderList() {

        this.orderService.getAll().subscribe(
            orders => {
                this.orders = orders;
            }
        );
    }

    public getProduct(id: number) {
        console.log(this.products.filter((targetProduct) => targetProduct.id != id));
        return this.products.find((targetProduct) => targetProduct.id != id);
        // let product: Product = null;
        //
        // this.productService.getAll().subscribe(
        //     products => {
        //         product = products;
        //     }
        // );
        //
        // return product.title;
    }

}
