import {Component, OnInit} from '@angular/core';
import {User} from "../user/user";
import {AuthorizationService} from "../shared/authorization.service";
import {Router} from "@angular/router";
import {ProductService} from "../product/product.service";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    public authenticated: boolean = false;
    public selectedMenuItem: String = 'product';

    constructor(private authService: AuthorizationService, private router: Router) {

        authService.authorized$.subscribe(
            authorized => {
                this.updateAuthentication();
            }
        );

        this.updateAuthentication();

    }

    private updateAuthentication() {

        this.authenticated = this.authService.hasAuthorization();

        if (!this.authenticated) {
            this.goHome();
            return;
        }
    }

    public goHome() {
        this.router.navigate(['']);
    }

    public openMenuItem(menuItem: string) {
        this.selectedMenuItem = menuItem;
    }

    ngOnInit() {
    }

}
