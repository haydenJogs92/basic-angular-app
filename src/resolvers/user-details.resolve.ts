import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user-service';
import { UserData } from '../models/models'

@Injectable()
export class UserDetailsResolve implements Resolve<UserData>
{

  constructor(private userService: UserService) {}

  resolve( route: ActivatedRouteSnapshot )
  {
    return this.userService.getUserInfoFromAPI( route.paramMap.get('id') )
  }
}
