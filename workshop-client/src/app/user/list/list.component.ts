
import { Component } from '@angular/core';

import { ListDataSource } from './list.datasource';

import { UserService } from '../user.service';
import {User} from "../user";
import {Router} from "@angular/router";

@Component({
    selector: 'user-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ListComponent {

    public displayedColumns = ['fullName', 'postcode', 'streetnumber', 'emailAddress', 'delete'];
    public dataSource = null;

    constructor(private userService: UserService, private router: Router) {

        this.getUsersList();

    }

    private getUsersList() {

        this.userService.getAll().subscribe(
            users => {
                this.dataSource = new ListDataSource(users);
            }
        );
    }

    public deleteUser(user: User) {
        this.userService.deleteUser(user, false);

        let thisClass = this;

        setTimeout(function() {
            thisClass.getUsersList();
        },200);
    }

    public hasData() {
        return this.dataSource !== null;
    }

}
