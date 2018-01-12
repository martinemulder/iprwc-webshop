import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from "./order.service";
import { AdminModule } from "../admin/admin.module";
import { OrderListComponent } from "./list/orderlist.component";
import { MatTableModule } from "@angular/material";
import {OrderComponent} from "./order.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule, AdminModule, MatTableModule, RouterModule ],
    declarations: [ OrderListComponent, OrderComponent ],
    providers: [ OrderService ]
})

export class OrderModule {
}
