import { Injectable } from '@angular/core';
import { ApiService } from "../shared/api.service";
import { AuthorizationService } from "../shared/authorization.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import {Product} from "./product";
import "rxjs/add/operator/map";

@Injectable()
export class ProductService {

    constructor(private api: ApiService,
                private authService: AuthorizationService,
                private router: Router) {

    }

    public getAll(): Observable<Product[]> {
        return this.api.get<Product[]>('products');
    }

    public get(id: number): Observable<Product[]> {
        return this.api.get<Product[]>('products/'+id);
    }

    public deleteProduct(product: Product): void {

        this.api.delete<void>('products/'+product.barcode).subscribe(
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
            price: product.price,
        };

        this.api.put<void>('products', data).subscribe(
            data => {
                alert('Product aanpassen gelukt');
            },
            error => {
                alert('Product aanpassen mislukt.');
            }
        );
    }

    public addProduct(product: Product): void {
        let data = {
            barcode: product.barcode,
            artist: product.artist,
            title: product.title,
            year: product.year,
            price: product.price
        };

        this.api.post<void>('products', data).subscribe(
            data => {

            },
            error => {
                alert('Product toevoegen mislukt.');
            }
        );
    }

}
