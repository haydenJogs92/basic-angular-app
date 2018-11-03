import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { ProductList, Product, Order } from '../../models/models';
//import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {


  public bFormErrors: boolean = false;
  public bIsProcessingOrderRequest: boolean = false;
  public bShowOrderSuccess: boolean = false;
  public aAvailableProducts: Array<Product>;
  public aMaxOrderSelect: Array<number> = [1,2,3,4,5,6,7,8,9,10];
  public currentOrder: Order;
  public successfulOrder: Order

  constructor( public userService: UserService ) { }

  ngOnInit(){}





}
