
import { Component } from '@angular/core';
import { ListDataSource } from './orderlist.datasource';
import { OrderService } from "../order.service";
import {Product} from "../../product/product";
import {ProductService} from "../../product/product.service";
import {Order} from "../order";

@Component({
    selector: 'order-list',
    templateUrl: './orderlist.component.html',
    styleUrls: ['./orderlist.component.css'],
})

export class OrderListComponent {

    public displayedColumns = ['orderNr', 'product', 'quantity', 'date','delete'];
    public dataSource = null;

    public products: Product[];

    constructor(private orderService: OrderService, private productService: ProductService) {

        this.getOrdersList();
        this.getProductList();

    }

    private getOrdersList() {

        this.orderService.getAll().subscribe(
            orders => {
                this.dataSource = new ListDataSource(orders);
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

    public getProduct(id: number) {
        return this.products.find((targetProduct) => targetProduct.id != id);
    }

    public getTotalPrice() {

    }

    public hasData() {
        return this.dataSource !== null;
    }

    public deleteOrder(order: Order) {
        this.orderService.deleteOrder(order.orderNr);
    }

}
