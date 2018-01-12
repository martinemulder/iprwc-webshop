import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from "./admin.component";
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import {OrderListComponent} from "../order/list/orderlist.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule, RouterModule
    ],
    declarations: [ AdminComponent, AdminProductComponent, AdminOrderComponent, AdminUserComponent ]
})

export class AdminModule {
}
