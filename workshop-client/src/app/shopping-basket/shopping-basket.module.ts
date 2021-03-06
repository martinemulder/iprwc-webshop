import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingBasketComponent } from "./shopping-basket.component";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { ShoppingBasketService } from "./shopping-basket.service";

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        RouterModule
    ],
    declarations: [ ShoppingBasketComponent ],
    providers: [ ShoppingBasketService ]
})

export class ShoppingBasketModule {
}
