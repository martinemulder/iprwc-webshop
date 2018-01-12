
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';
import { UserModule } from '../user/user.module';

import { HomeComponent } from './home.component';
import {ProductService} from "../product/product.service";

@NgModule({
    imports: [ PublicModule, UserModule ],
    declarations: [ HomeComponent ],
    providers: [ ProductService ]
})

export class HomeModule { }
