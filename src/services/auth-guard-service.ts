import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { UserService } from './user-service';


//how to guard routes in angular
//you only want user to access certain routes if logged in
//apply this to routes you want to guard


@Injectable()
export class AuthGuard implements CanActivate
{

  constructor( private userService: UserService, private router: Router  ) { }

  canActivate( route, state: RouterStateSnapshot )
  {
    //is this allowed
    if ( this.userService.isUserLoggedIn() )
    {
      return true;
    }
    else
    {
      //navigate user back to login, but provide a query parameter to take them to where they want to go
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
