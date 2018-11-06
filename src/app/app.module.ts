import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MockBackend } from '@angular/http/testing';
import { testApiProvider } from '../api/test-api';
import { AppComponent } from './app.component';

//components
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { NotFoundComponent } from '../components/notfound/notfound.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { UpdateDetailsComponent } from '../components/update-details/update-details.component';
import { UpdateDetailsFormComponent } from '../components/update-details-form/update-details-form.component';
import { OrderHistoryComponent } from '../components/order-history/order-history.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MakeOrderComponent } from '../components/make-order/make-order.component';
import { OrderFormComponent } from '../components/order-form/order-form.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';
import { FloatingLabelInputComponent } from '../components/floating-label-input/floating-label-input.component';
import { OrderConfirmationComponent } from '../components/order-confirmation/order-confirmation.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

//models
import {UserData,UserOrderHistory,Order,Product} from '../models/models';

//services
import { UserService } from '../services/user-service';
import { OrderService } from '../services/order-service';
import { ValidationService } from '../services/validation-service';
import { AuthGuard } from '../services/auth-guard-service';

//global error handler
import { AppErrorHandler } from '../services/app-error-handler';

//resolvers
import { UserDetailsResolve } from '../resolvers/user-details.resolve'
import { OrderHistoryResolve } from '../resolvers/order-history.resolve'
import { OrderProductsListResolve } from '../resolvers/order-products-list.resolve'
import { OrderConfirmationResolve } from '../resolvers/order-confirmation.resolve';

//routes
import { routes } from './app.routes'

//use for passing token in http request to access protected api endpoints
import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 'angular2-jwt/angular2-jwt';











//when using auth http, tell authHttp the name of token in local storage
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,
    NotFoundComponent,
    NavBarComponent,
    UserDetailsComponent,
    UpdateDetailsComponent,
    UpdateDetailsFormComponent,
    FooterComponent,
    OrderHistoryComponent,
    MakeOrderComponent,
    FloatingLabelInputComponent,
    OrderFormComponent,
    OrderConfirmationComponent,
    OrderDetailsComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    //for routes
    RouterModule.forRoot( routes )
  ],
  providers: [
    UserService,
    UserDetailsResolve,
    OrderHistoryResolve,
    OrderConfirmationResolve,
    OrderProductsListResolve,
    OrderService,
    ValidationService,
    AuthGuard,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    AppErrorHandler,
    //custom error handler
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },

    //data Models
    UserData,
    UserOrderHistory,
    Order,

    //use fake backend
    testApiProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
