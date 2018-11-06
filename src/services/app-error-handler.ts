
//my problem exactly
//https://stackoverflow.com/questions/44108285/angular-4-custom-errorhandler-doesnt-recognize-custom-error

//good ideas for what data to collect when sending an error report
//https://www.concretepage.com/angular/angular-custom-error-handler#Global


import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { AppError, NotFoundError } from '../models/models'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

//need to use injector to use other services

@Injectable()
export class AppErrorHandler extends ErrorHandler
{


  public errorMessageSubject = new Subject<string>();
  public errorMessage$ = this.errorMessageSubject.asObservable();

  constructor( private injector: Injector )
  {
    super( false );
    this.errorMessageSubject.next( 'Initial error' );
  }


  //all errors pass through here, adds to standard ErrorHandler default method
  handleError( error: any )
  {

      if ( error instanceof AppError )
      {
        this.handleAppError( <AppError>error )
      }
      if ( error.rejection instanceof AppError )
      {
        //might be an unhandled promise
        //https://stackoverflow.com/questions/44108285/angular-4-custom-errorhandler-doesnt-recognize-custom-error
        this.handleAppError( <AppError>error.rejection )
      }

      //handle 404 error
      if ( error.rejection instanceof NotFoundError )
      {
        this.handleNotFoundError( <NotFoundError>error.rejection )
      }

      //log the error like usual
      //maybe only log the stacktrace when in dev mode
       //super.handleError( error );
  }

  //only app errors pass through here
  //here we can send error to server and show the message to the user
  handleAppError( appError: AppError )
  {
      //console.log('we have an app error')
      //this.errorMessage = appError.message;
      this.setMessage( appError.message );
  }

  handleNotFoundError( notFoundError: NotFoundError )
  {
    //console.log('We were unable to retrieve the requested resource ')
    this.setMessage( 'We were unable to retrieve the requested resource.' ) ;
  }


  setMessage( value:string )
  {
    //this is pretty much exactly what I want to do: https://funneltravel.wordpress.com/2017/11/03/create-a-global-error-component-for-angular-4/
    this.errorMessageSubject.next( value );
  }



  //handle error for normal requests, can be used within catch
  httpCatchHandleError(error: Response)
  {    
    if (error.status === 404)
    {
      return Observable.throw(new NotFoundError());
    }

    return Observable.throw(new AppError(error));
  }

}
