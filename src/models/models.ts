

export class UserData
{
  public userID:number =  324231;
  public nameFirst:string;
  public nameLast:string;
  public email:string;
  public phone:string;
}


//the key is here i think: https://stackoverflow.com/questions/44108285/angular-4-custom-errorhandler-doesnt-recognize-custom-error
export class AppError extends Error
{
  constructor(message?: any)
  {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }

  getMessage()
  {
    return "Error: " + this.message;
  }
}


export class NotFoundError extends Error
{
  constructor(message?: any)
  {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}


export class UserDataResolved
{
  //https://www.youtube.com/watch?v=d5bkiNebYWk
}


export class UserOrderHistory
{
  public orders:Array<Order>
}


export class Order
{
  public orderID:number;
  public orderName:string;
  public orderValue:number;
  public orderUnitPrice:number;
  public orderQuantity:number;
  public orderDate:string;
  //for now, all orders belong to one user
  public foreignKeyUserID:number =  1;
}


export class ProductList
{
  public products:Array<Product>
}


export class Product
{
  public productID: number;
  public productName: string;
  public productPrice: number;
}
