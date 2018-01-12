import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from "./list/productlist.component";
import { MatTableModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule, MatTableModule, FormsModule
    ],
    declarations: [ ProductListComponent ]
})

export class ProductModule {
}
