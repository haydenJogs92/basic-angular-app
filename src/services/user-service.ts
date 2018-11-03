

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
//use for passing token in http request to access protected api endpoints
import { AuthHttp } from 'angular2-jwt'

import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
//run map on observable
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import {UserData, UserOrderHistory, Order} from '../models/models';

@Injectable()


export class UserService
{

  public testEmail: string = 'test@test.com';
  public testPassword: string = 'test';
  public userID: number;



  constructor( public http: Http,
               public authHttp: AuthHttp,
               public router: Router,
               public currentRoute: ActivatedRoute ){}


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
       this.setTokenInStorage( result.jwtToken )
       //then set user ID from token
       this.setUserIDFromStorage();
       //navigate to user page, with user id as param
       this.router.navigate(['/user/', this.userID]);
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
       this.setTokenInStorage( result.jwtToken )
       return true;
     }
     else
     {
       return false;
     }
   });

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
    if ( this.isUserLoggedIn() )
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
         }
       });

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
       return false;
     }
   });

  }


  logOut()
  {
      //unset jwt token
      localStorage.removeItem( 'token' );
      this.userID = null;
      this.router.navigate(['/']);
  }


}
