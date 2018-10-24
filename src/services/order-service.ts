import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
//use for passing token in http request to access protected api endpoints
import { AuthHttp } from 'angular2-jwt'
import { Order} from '../models/models';

@Injectable()
export class OrderService {

  constructor( public authHttp: AuthHttp ) { }



  getAvailableProducts()
  {
    let creds = '';
    return this.authHttp.post('/api/get-products', JSON.stringify(creds))
    .map( response => {
     let result = response.json();
     //if valid and we have a jwtToken
     if ( result && result.jwtToken )
     {
       return result.data;
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
       return result.data;
     }
     else
     {
       return false;
     }
   });
  }




}
