import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
//use for passing token in http request to access protected api endpoints
import { AuthHttp } from 'angular2-jwt'
import { Order, Product, AppError } from '../models/models';
import { UserService } from './user-service';
import { Router} from '@angular/router';
import { AppErrorHandler } from './app-error-handler'
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderService {

  constructor( public authHttp: AuthHttp,
               public userService: UserService,
               public router: Router,
               public appErrorHandler: AppErrorHandler) { }



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
       throw new AppError( 'Unable to retrieve products' );
     }
   })
   .catch(this.appErrorHandler.httpCatchHandleError);;
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
       this.router.navigate(['/user/', this.userService.userID, 'confirmation', result.data.orderID]);
       return true;
     }
     else
     {
       throw new AppError( 'Unable to submit your order' );
     }
   })
   .catch(this.appErrorHandler.httpCatchHandleError);;
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
       throw new AppError( 'Unable to retrieve order confirmation' );
     }
   })
   .catch(this.appErrorHandler.httpCatchHandleError);;
  }




}
