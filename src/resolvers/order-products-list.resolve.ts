import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from '../services/order-service';
import { ProductList, Product } from '../models/models'

@Injectable()
export class OrderProductsListResolve implements Resolve<Array<Product>>
{

  constructor(private orderService: OrderService) {}

  resolve( route: ActivatedRouteSnapshot )
  {
    return this.orderService.getAvailableProducts();
  }
}
