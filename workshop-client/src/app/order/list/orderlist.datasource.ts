
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Order } from "../order";

export class ListDataSource extends DataSource<any> {

    constructor(private orders: Order[]) {
        super();
    }

    public connect(): Observable<Order[]> {
        return Observable.of(this.orders);
    }

    public disconnect() {}

}
