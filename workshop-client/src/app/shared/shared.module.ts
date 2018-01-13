
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';

import { AuthorizationService } from './authorization.service';
import { ApiService } from './api.service';

import { HeaderComponent } from './header/header.component';
import {AuthGuardService} from "./auth-guard.service";
import {AuthGuardAdminService} from "./auth-guard-admin.service";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";

@NgModule({
    imports: [ PublicModule ],
    declarations: [ HeaderComponent ],
    exports: [ HeaderComponent ],
    providers: [ ShoppingBasketService, ApiService, AuthorizationService, AuthGuardService, AuthGuardAdminService ]
})
export class SharedModule { }
