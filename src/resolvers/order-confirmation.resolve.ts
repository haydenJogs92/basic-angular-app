import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from '../services/order-service';
import { Order } from '../models/models'

@Injectable()
export class OrderConfirmationResolve implements Resolve<Order>
{

  constructor(private orderService: OrderService) {}

  resolve( route: ActivatedRouteSnapshot )
  {
    return this.orderService.getOrderConfirmation( route.paramMap.get('orderID') );
  }
}
