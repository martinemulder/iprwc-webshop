
import { Component } from '@angular/core';
import { ListDataSource } from './productlist.datasource';
import { ProductService } from "../product.service";
import { Product } from "../product";
import {Router} from "@angular/router";

@Component({
    selector: 'product-list',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css'],
})

export class ProductListComponent {

    public displayedColumns = ['barcode','artist','title','year','price','delete'];
    public dataSource = null;

    public products: Product[];
    public actionAddProduct: boolean = false;

    constructor(private productService: ProductService, private router: Router) {

        this.getProductList();

    }

    private getProductList() {

        this.productService.getAll().subscribe(
            products => {
                this.dataSource = new ListDataSource(products);
            }
        );
    }

    public hasData() {
        return this.dataSource !== null;
    }

    public editProduct(product: Product) {
        this.productService.editProduct(product);
    }

    public deleteProduct(product: Product) {
        this.productService.deleteProduct(product);

        let thisClass = this;

        setTimeout(function() {
            thisClass.getProductList();
        },200);

    }

    public openAddProduct() {
        this.actionAddProduct = true;
    }

    public closeAddProduct() {
        this.actionAddProduct = false;
    }

}
