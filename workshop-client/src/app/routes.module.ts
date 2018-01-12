
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ListComponent } from './user/list/list.component';
import { ShoppingBasketComponent } from "./shopping-basket/shopping-basket.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuardService } from "./shared/auth-guard.service";
import { AuthGuardAdminService } from "./shared/auth-guard-admin.service";
import { OrderListComponent } from "./order/list/orderlist.component";
import {OrderComponent} from "./order/order.component";
import {ProductListComponent} from "./product/list/productlist.component";


export const routes: Routes =
[
    { path: '', component: HomeComponent },
    { path: 'registreer', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'gebruikers', component: ListComponent },
    { path: 'bestellingen', component: OrderListComponent },
    { path: 'producten', component: ProductListComponent },
    { path: 'bestelling-afgerond', component: OrderComponent },
    { path: 'profiel', component: ProfileComponent, canActivate:[AuthGuardService] },
    { path: 'winkelmand', component: ShoppingBasketComponent },
    { path: 'webshop-admin', component: AdminComponent, canActivate:[AuthGuardAdminService] },
    { path: 'webshop-admin/producten', component: AdminComponent, canActivate:[AuthGuardAdminService] },
    { path: 'webshop-admin/gebruikers', component: AdminComponent, canActivate:[AuthGuardAdminService] },
    { path: 'webshop-admin/bestellingen', component: AdminComponent, canActivate:[AuthGuardAdminService] }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutesModule { }
