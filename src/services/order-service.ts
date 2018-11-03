import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
//use for passing token in http request to access protected api endpoints
import { AuthHttp } from 'angular2-jwt'
import { Order, Product } from '../models/models';
import { UserService } from './user-service';
import { Router} from '@angular/router';

@Injectable()
export class OrderService {

  constructor( public authHttp: AuthHttp,
               public userService: UserService,
               public router: Router ) { }



  getAvailableProducts()
  {
    let creds = '';
    return this.authHttp.post('/api/get-products', JSON.stringify(creds))
    .map( response => {
     let result = response.json();
     //if valid and we have a jwtToken
     if ( result && result.jwtToken )
     {
       return <Array<Product>>result.data;
     }
     else
     {
       return false;
     }
   });
  }



  submitOrder( currentOrder: Order )
  {
    let creds =  currentOrder;
    return this.authHttp.post('/api/submit-order', JSON.stringify(creds))
    .map( response => {
     let result = response.json();
     //if valid and we have a jwtToken
     if ( result && result.jwtToken )
     {
       ////this.router.navigateByUrl( '/user/' +  this.userService.userID + '/confirmation/' + result.data.orderID ]);
       this.router.navigate(['/user/', this.userService.userID, 'confirmation', result.data.orderID]);
       //return result.data.orderID;
       return true;
     }
     else
     {
       return false;
     }
   });
  }


  getOrderConfirmation( orderID: string )
  {
    let creds =  { orderID: orderID };
    return this.authHttp.post('/api/order-confirmation', JSON.stringify(creds))
    .map( response => {
     let result = response.json();
     //if valid and we have a jwtToken
     if ( result && result.jwtToken )
     {
       return <Order>result.data;
     }
     else
     {
       return false;
     }
   });
  }




}
