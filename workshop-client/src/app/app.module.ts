import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutesModule } from './routes.module';
import { PublicModule } from './public.module';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { ShoppingBasketModule } from "./shopping-basket/shopping-basket.module";
import { AdminModule } from "./admin/admin.module";
import { OrderModule } from "./order/order.module";
import {ProductModule} from "./product/product.module";

@NgModule({
    imports: [
        BrowserModule,
        RoutesModule,
        PublicModule,
        SharedModule,
        HomeModule,
        UserModule,
        ShoppingBasketModule,
        AdminModule,
        OrderModule,
        ProductModule
    ],
    exports: [ PublicModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
}
