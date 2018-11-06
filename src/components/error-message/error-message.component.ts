import { Component, OnInit, OnDestroy, ErrorHandler, ChangeDetectorRef } from '@angular/core';
import { AppErrorHandler } from '../../services/app-error-handler'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
//this might be an approach to get data from the service; https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service

export class ErrorMessageComponent implements OnInit, OnDestroy {


  public displayErrorMessage: string;
  public errorMessageDuration: number = 4000;
  public bShowErrorMessage: boolean = false;
  public subscription: Subscription;
  public errorContextState$: Observable<string>;


  constructor(  private errorHandler: ErrorHandler, public changeDetectorRef : ChangeDetectorRef  ) { }

  ngOnInit()
  {

    /*
    please note: this is a little tricky
    Intuitively, you would think that you need to just import AppErrorHandler to work with this subscription
    However, you would be wrong, just like me
    Instead, import ErrorHandler and check if we are working with an AppErrorHandler instance, this is because we are using
    provide AppErrorHandler when using ErrorHandler in ngModule
    check this out: https://funneltravel.wordpress.com/2017/11/03/create-a-global-error-component-for-angular-4/
    */
    if ( this.errorHandler instanceof AppErrorHandler )
    {      
      this.subscription = this.errorHandler.errorMessage$.subscribe(
       (message) => {
         this.showTemporaryErrorMessage( message );
       }
     );
    }
  }

  showTemporaryErrorMessage( message )
  {
    this.bShowErrorMessage = true;
    this.displayErrorMessage = message;
    this.changeDetectorRef.detectChanges();

    setTimeout( () =>
    {
      this.bShowErrorMessage = false;
      this.changeDetectorRef.detectChanges();
    }, this.errorMessageDuration );
  }

  ngOnDestroy()
  {
  this.subscription.unsubscribe();
  }

}
