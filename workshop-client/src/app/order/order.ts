
import { User } from "../user/user";

export class Order {

    constructor(
        public orderNr?: number,
        public productId?: number,
        public quantity?: number,
        public date?: String,
        public user?: User) {
    }

}
