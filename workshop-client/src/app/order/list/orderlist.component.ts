
import { Component, OnInit } from '@angular/core';
import { ListDataSource } from './orderlist.datasource';
import { OrderService } from "../order.service";
import { Product } from "../../product/product";
import { ProductService } from "../../product/product.service";
import { User } from "../../user/user";

@Component({
    selector: 'order-list',
    templateUrl: './orderlist.component.html',
    styleUrls: ['./orderlist.component.css'],
})

export class OrderListComponent implements OnInit {

    public displayedColumns = ['orderNr', 'user', 'date'];
    public dataSource = null;
    public orders = [];
    public user: User;
    public users: User[] = [];

    public products: Product[];

    constructor(private orderService: OrderService, private productService: ProductService) {

    }

    ngOnInit() {

        this.getOrdersList();
        this.getProductList();

    }

    private getOrdersList() {

        this.orderService.getAll().subscribe(
            orders => {
                this.orders = orders.map(order => { return {
                    order: order,
                    user: this.getUser(order.orderNr)};
                });
                this.dataSource = new ListDataSource(this.orders);
                console.log(this.orders);
            }
        );

    }

    private getProductList() {

        this.productService.getAll().subscribe(
            products => {
                this.products = products;
            }
        );
    }

    public getUser(orderNr: number) {
        return this.orderService.getUser(orderNr);
    }

    public hasData() {
        return this.dataSource !== null;
    }

}
