
import { NgModule } from '@angular/core';

import { PublicModule } from '../public.module';

import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
    imports: [ PublicModule, SharedModule ],
    exports: [ LoginComponent ],
    declarations: [ RegisterComponent, LoginComponent, ListComponent, ProfileComponent ],
    providers: [ UserService ]
})

export class UserModule { }
