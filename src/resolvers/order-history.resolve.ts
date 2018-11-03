import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user-service';
import { UserOrderHistory } from '../models/models'

@Injectable()
export class OrderHistoryResolve implements Resolve<UserOrderHistory>
{

  constructor(private userService: UserService) {}

  resolve( route: ActivatedRouteSnapshot )
  {
    return this.userService.getUserOrderHistory( route.paramMap.get('id') );
  }
}
