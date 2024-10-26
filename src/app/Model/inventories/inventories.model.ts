export class InventoriesModel {
    constructor(
        public productItems: [{
            qty: number,
            location: string
        }]
    ) { }
}
