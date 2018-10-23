

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
//use for passing token in http request to access protected api endpoints
import { AuthHttp } from 'angular2-jwt'

import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
//run map on observable
import 'rxjs/add/operator/map';

import {UserData, UserOrderHistory, Order} from '../models/models';

@Injectable()


export class UserService
{

  public testEmail: string = 'test@test.com';
  public testPassword: string = 'test';


  constructor( private http: Http, private authHttp: AuthHttp, private router: Router, private currentRoute: ActivatedRoute ){}


  //send a request to a fake backend
  //expects a JWT token on success
  //return http observable
  userLoginRequest( userEmail: string, userPassword: string  )
  {
    let creds = { email: userEmail, password: userPassword  };
    return this.http.post('/api/user-login', JSON.stringify(creds))
    .map( response => {
     let result = response.json();
     //if valid and we have a jwtToken

     if ( result && result.jwtToken )
     {
       //then store in local storage
       this.setUserDetailsInStorage( result.jwtToken, <UserData>result.data  )
       //navigate to user page
       this.router.navigate(['/user-details/']);
       return true;
     }
     else
     {
       return false;
     }
   });

  }


  //return http post, sent to protected endpoint
  userUpdateDetails( oData )
  {
    let creds = oData;
    //not sending token currently
    return this.authHttp.post('/api/user-update', JSON.stringify(creds))
    .map( response => {
     let result = response.json();
     //if valid and we have a jwtToken
     if ( result && result.jwtToken )
     {
       //update user details in local storage
       this.setUserDetailsInStorage( result.jwtToken,  <UserData>result.data )
       return true;
     }
     else
     {
       return false;
     }
   });

  }

  //set jwt token and user details in local storage
  setUserDetailsInStorage( token: string, userData: UserData )
  {
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'userInfo', JSON.stringify( <UserData>userData ) );
  }



  getUserInfoFromStorage()
  {
    //if we have a token for this user
    if ( this.isUserLoggedIn() )
    {
      let userInfo = <UserData>JSON.parse(localStorage.getItem( 'userInfo' ));
      return  userInfo;
    }
    return null;
  }

  //check the token and its expiration date with jwthelper global method
  isUserLoggedIn()
  {
    //if token is set && not expired

    return tokenNotExpired();
    //alternatively, you can read the token here to check if it is expired
    /*
    let token = localStorage.getItem( 'token' );
    if ( token == null )
    {
      return null
    }
    let jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken( token );
    */
  }


  //return http post, sent to protected endpoint, so api requires JWT
  //return UserOrderHistory
  getUserOrderHistory()
  {
    let creds = '';
    return this.authHttp.post('/api/user-order-history', JSON.stringify(creds))
    .map( response => {
     let result = response.json();
     //if valid and we have a jwtToken
     if ( result && result.jwtToken )
     {
       return <UserOrderHistory>result.data;
     }
     else
     {
       return false;
     }
   });

  }


  logOut()
  {
      //unset jwt token
      //unset user info
      localStorage.removeItem( 'token' );
      localStorage.removeItem( 'userInfo' );
      this.router.navigate(['/']);
  }


}
