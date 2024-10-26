import { ProductModel } from "../product/product.model";

export class OrderModel {
    constructor(
        public userId: string,
        public totalAmount: number,
        public orderDate: Date,
        public products: ProductModel[] = []
    ) { }
}
