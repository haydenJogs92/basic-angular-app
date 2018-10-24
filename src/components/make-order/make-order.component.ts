import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Product, Order } from '../../models/models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  public orderForm: FormGroup;
  public bRequestError: boolean = false;
  public bFormErrors: boolean = false;
  public bIsProcessingOrderRequest: boolean = false;
  public bIsProcessingProductsRequest: boolean = false;
  public bShowOrderSuccess: boolean = false;
  public aAvailableProducts: Array<Product>;
  public aMaxOrderSelect: Array<number> = [1,2,3,4,5,6,7,8,9,10];
  public currentOrder: Order;
  public successfulOrder: Order

  constructor( public orderService: OrderService, public form: FormBuilder ) { }

  ngOnInit()
  {
    this.initializeOrderForm();
    this.getAvailableProducts();
  }

  initializeOrderForm()
  {
    this.orderForm = this.form.group({
      sProduct : ['', Validators.required ],
      sQuantity : [1, Validators.required],
      });

     this.listenForFormChanges()
  }

  listenForFormChanges()
  {
    this.orderForm.valueChanges.subscribe( ( value ) => {
        if ( value.sProduct )
        {
          this.updateCart( value );
        }
    });
  }

  getAvailableProducts()
  {
    this.bIsProcessingProductsRequest = true;
    this.orderService.getAvailableProducts()
    .subscribe( result => {
        if ( !result )
        {
          this.bRequestError = true;
        }
        else
        {
          this.aAvailableProducts = result;
          //  this.userOrderHistory  = <UserOrderHistory>result;
        }
        this.bIsProcessingProductsRequest = false;
    });
  }


  updateCart( formValue )
  {
    //get the product
    let productToPurchase: Product;
    for (let oProduct of this.aAvailableProducts )
    {
      if ( formValue.sProduct == oProduct.productName )
      {
        productToPurchase = oProduct;
      }
    }
    //set the values for the current ordre
    let iQuantity = parseInt( formValue.sQuantity );
    this.currentOrder =
    <Order>{
      orderID: null,
      orderDate: null,
      foreignKeyUserID: null,
      orderUnitPrice: productToPurchase.productPrice,
      orderQuantity: iQuantity,
      orderValue: iQuantity * productToPurchase.productPrice,
      orderName: productToPurchase.productName,
    }

  }


  submitOrder()
  {
    this.bIsProcessingOrderRequest = true;
    this.orderService.submitOrder( < Order >this.currentOrder ).subscribe( result => {
        if ( !result )
        {
          this.bFormErrors = true;
        }
        else
        {
          this.successfulOrder = result;
          this.bFormErrors = false;
          this.bShowOrderSuccess = true;
        }

        this.bIsProcessingOrderRequest = false;
      });
  }





}
