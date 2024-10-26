import { InventoriesModel } from "../inventories/inventories.model";
import { ReviewsModel } from "../reviews/reviews.model";

export class ProductModel {
    constructor(
        public name: string,
        public description: string,
        public stock: number,
        public price: number,
        public inventory: InventoriesModel | null = null,
        public reviews: ReviewsModel[] = []
    ) { }
}
