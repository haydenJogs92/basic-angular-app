import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import {  Product, Order } from '../../models/models';
import { OrderService } from '../../services/order-service'
import {Subscription} from 'rxjs';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {


  public orderForm: FormGroup;
  public aAvailableProducts: Array<Product>;
  public aMaxOrderSelect: Array<number> = [1,2,3,4,5,6,7,8,9,10];
  public formSubscribe: Subscription;
  public currentOrder:Order;
  public successfulOrder:Order;
  public bFormErrors: boolean = false
  public bOrderComplete: boolean = false;
  public bIsProcessingOrderRequest: boolean = false;

  constructor( public orderService: OrderService,
               public route: ActivatedRoute,
               public form: FormBuilder, ) { }

  ngOnInit()
  {
    this.aAvailableProducts = this.route.snapshot.data['productList'];
    this.initializeOrderForm();
    this.listenForFormChanges()
  }


    initializeOrderForm()
    {
      this.orderForm = this.form.group({
        sProduct : ['', Validators.required ],
        sQuantity : [1, Validators.required],
        });
    }

    listenForFormChanges()
    {
      this.formSubscribe = this.orderForm.valueChanges.subscribe( ( value ) => {
          if ( value.sProduct )
          {
            this.updateCart( value );
          }
          this.bFormErrors = false;
      });
    }

    ngOnDestroy()
    {
      this.formSubscribe.unsubscribe();
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
    this.orderService.submitOrder( <Order>this.currentOrder ).subscribe( result => {
        if ( !result )
        {
          this.bFormErrors = true;
        }
        else
        {
          this.bFormErrors = false;
          this.bOrderComplete = true;
        }

        this.bIsProcessingOrderRequest = false;
      });
  }

}
