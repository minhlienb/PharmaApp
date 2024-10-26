export class CartModel {
    constructor(
        public userId: string,
        public products: CartProduct[] = []

    ) { }
}

export class CartProduct {
    constructor(
        public productId: string,
        public productName: string,
        public qty: number,
        public price: number,//Đơn giá của từng sản phẩm * số lượng sản phẩm
    ) { }

}
