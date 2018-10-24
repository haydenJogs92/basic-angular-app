

export class UserData
{

  public userID:number =  1;

  public nameFirst:string;
  public nameLast:string;
  public email:string;
  public phone:string;
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


export class Product
{
  public productID: number;
  public productName: string;
  public productPrice: number;
}
