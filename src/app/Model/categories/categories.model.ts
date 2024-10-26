import { ProductModel } from "../product/product.model";

export class CategoriesModel {
    constructor(
        public name: string,
        public desc: string,
        public products: ProductModel[] = []
    ) { }
}
