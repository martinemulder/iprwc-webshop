import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingBasketComponent } from "./shopping-basket.component";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        RouterModule
    ],
    declarations: [ShoppingBasketComponent]
})

export class ShoppingBasketModule {
}
