
import { Component } from '@angular/core';
import { ListDataSource } from './productlist.datasource';
import { ProductService } from "../product.service";
import { Product } from "../product";
import { Router } from "@angular/router";
import {isNumber} from "util";

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

    public product: Product = new Product();
    public submitted: boolean = false;

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
        this.refresh();
    }

    public refresh() {
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

    public addProduct() {

        this.submitted = true;

        if (this.product.artist != null && this.product.title != null && this.product.barcode != null &&
            this.product.year != null && this.product.price != null) {
            console.log(this.product);
            this.productService.addProduct(this.product);
            this.actionAddProduct = false;
            this.refresh();
            this.product = null;
        }

    }

}
