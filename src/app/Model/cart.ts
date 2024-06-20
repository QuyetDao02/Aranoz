export class carts{
    ProductID:number;
    ProductName: string;
    ProductPrice: number;
    ProductPath: string;
    Quantity: number;
    UserID: number;
    DepotID:number;
    
    constructor(id:number,name:string,price:number,path:string,quantity:number,userid:number,depotid:number){
        this.ProductID = id;
        this.ProductName = name;
        this.ProductPrice = price;
        this.ProductPath = path;
        this.Quantity = quantity;
        this.UserID = userid;
        this.DepotID = depotid;
    }
}