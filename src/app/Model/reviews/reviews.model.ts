export class ReviewsModel {
    constructor(
        public productId: string,
        public userId: string,
        public rating: number,
        public comment: string,
        public reviewDate: Date
    ) { }
}
