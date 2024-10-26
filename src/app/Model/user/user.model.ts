
export class UserModel {
    constructor(
        public uid: string,
        public fullName: string,
        public email: string,
        public telephone: string,
        public addres: Address,
        public isAdmin: boolean = false,
        public createdAt: Date,
    ) {
        this.uid = uid;
        this.fullName = fullName;
        this.email = email;
        this.telephone = telephone;
        this.addres = addres;
        this.isAdmin = isAdmin;
        this.createdAt = createdAt
    }
}
export class Address {
    constructor(
        public street: string,
        public postalCode: number,
        public city: string,
        public country: string
    ) {
        this.street = street;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country
    }
}
