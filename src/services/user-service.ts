

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
//use for passing token in http request to access protected api endpoints
import { AuthHttp } from 'angular2-jwt'

import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//throw method is a static method on the observable class, not an instantiated obj
//a factory method Observale.throw

import { AppErrorHandler } from './app-error-handler'

import {UserData, UserOrderHistory, Order, AppError, NotFoundError } from '../models/models';

@Injectable()


export class UserService
{

  public testEmail: string = 'test@test.com';
  public testPassword: string = 'test';
  public userID: number;



  constructor( public http: Http,
               public authHttp: AuthHttp,
               public router: Router,
               public currentRoute: ActivatedRoute,
               public appErrorHandler: AppErrorHandler){}


  //send a request to a fake backend
  //expects a JWT token on success
  //return http observable
  userLoginRequest( userEmail: string, userPassword: string  )
  {
    let creds = { email: userEmail, password: userPassword  };
    return this.http.post('/api/user-login', JSON.stringify(creds))
    .map( response => {
     let result = response.json();
     
     if ( result.error === "InvalidLogin" )
     {
       return result;
     }

     //if valid and we have a jwtToken
     if ( result && result.jwtToken )
     {
       //then store in local storage
       this.setTokenInStorage( result.jwtToken )
       //then set user ID from token
       this.setUserIDFromStorage();
       //navigate to user page, with user id as param
       this.router.navigate(['/user/', this.userID]);
       return true;
     }
     else
     {
       this.logOut()
       throw new AppError( 'Session Expired' );
     }
   })
   .catch(this.appErrorHandler.httpCatchHandleError);

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
       this.setTokenInStorage( result.jwtToken )
       return true;
     }
     else
     {
       this.logOut()
       throw new AppError( 'Session Expired' );
     }
   })
   .catch(this.appErrorHandler.httpCatchHandleError);

  }

  //set jwt token and user details in local storage
  setTokenInStorage( token: string )
  {
    localStorage.setItem( 'token', token );
  }


  //set the user ID from storage, so that the user, if logged in, can have persistent sessions
  setUserIDFromStorage()
  {
    //if we have a token for this user
    if ( this.isUserLoggedIn() )
    {
      //get user id from token in local storage
      let token = localStorage.getItem('token');
      if (token) {
        let jwt = new JwtHelper();
        let result = jwt.decodeToken(token);
        this.userID = result.userID;
      }
    }
  }

  getUserInfoFromAPI( userID: string )
  {
    //make api call
    let creds = {userID: userID};
    //not sending token currently
    return this.authHttp.post('/api/user-details', JSON.stringify(creds))
    .map( response => {
       let result = response.json();
       //if valid and we have a jwtToken
       if ( result && result.jwtToken )
       {
         return <UserData>result.data;
       }
       else
       {
         this.logOut()
         throw new AppError( 'Session Expired' );
       }
     })
     .catch(this.appErrorHandler.httpCatchHandleError)
  }

  //check the token and its expiration date with jwthelper global method
  isUserLoggedIn()
  {
    //if token is set && not expired
    return tokenNotExpired();
  }


  //return http post, sent to protected endpoint, so api requires JWT
  //return UserOrderHistory
  getUserOrderHistory( userID: string )
  {
    let creds = {userID: userID};
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
       this.logOut();
       throw new AppError( 'Session Expired' );
     }
   })
   .catch(this.appErrorHandler.httpCatchHandleError);
  }


  logOut()
  {
    //unset jwt token
    localStorage.removeItem( 'token' );
    this.userID = null;
    this.router.navigate(['/']);
  }


}
