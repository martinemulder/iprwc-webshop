import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../../shared/authorization.service";
import { Router } from "@angular/router";
import {User} from "../user";
import {UserService} from "../user.service";
import {Order} from "../../order/order";
import {OrderService} from "../../order/order.service";
import {ListDataSource} from "../../order/list/orderlist.datasource";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    public authenticated: boolean = false;
    public user: User;
    public userName = '';
    public actionDeleteAccount: boolean = false;
    public actionChangeUserDate: boolean = false;
    public orders: Order[];

    public displayedColumns = ['orderNr', 'date', 'delete'];
    public dataSource = null;

    constructor(private authService: AuthorizationService, private router: Router,
                private userService: UserService, public orderService: OrderService) {

        authService.authorized$.subscribe(
            authorized => {
                this.updateAuthentication();
            }
        );
        this.updateAuthentication();

    }

    ngOnInit() {

        this.getOrdersList();

    }

    private getOrdersList() {
        this.orderService.getMyOrders().subscribe(
            orders => {
                this.dataSource = new ListDataSource(orders);
            }
        );
    }

    private updateAuthentication() {

        this.authenticated = this.authService.hasAuthorization();

        if (!this.authenticated) {
            this.userName = '';

            return;
        }

        let user: User = this.authService.getAuthenticator();
        this.user = user;
        this.userName = user.fullName;
    }

    public cancelOrder(orderNr: number) {
        this.orderService.deleteOrder(orderNr);
        this.refreshOrders();
    }

    public refreshOrders() {
        let thisClass = this;

        setTimeout(function() {
            thisClass.getOrdersList();
        },200);
    }

    public editUser() {
        this.userService.edit(this.user);
        this.actionChangeUserDate = false;
    }

    public openDeleteAccount() {
        this.actionDeleteAccount = true;
    }

    public closeDeleteAccount() {
        this.actionDeleteAccount = false;
    }

    public deleteAccount() {
        this.userService.deleteUser(this.user, true);
    }

    public openChangeUserData() {
        this.actionChangeUserDate = true;
    }

    public closeChangeUserData() {
        this.actionChangeUserDate = false;
    }

    public hasData() {
        return this.dataSource !== null;
    }

}
