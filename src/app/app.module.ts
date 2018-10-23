import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

//models
import {UserData,UserOrderHistory,Order} from '../models/models';

//services
import { UserService } from '../services/user-service';
import { ValidationService } from '../services/validation-service';
import { AuthGuard } from '../services/auth-guard-service';


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
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,



    //for routes
    RouterModule.forRoot([
      {path: '',  component: HomeComponent },
      {path: 'login',  component: LoginComponent },
      {path: 'user-details',
       component: UserDetailsComponent,
       //protect this route from unnauthorized users
       canActivate: [AuthGuard]
      },
      {path: 'user-details/update-info',
       component: UpdateDetailsComponent,
       canActivate: [AuthGuard]
      },
      {path: 'user-details/order-history',
       component: OrderHistoryComponent,
       canActivate: [AuthGuard]
      },
      {path: '**',  component: NotFoundComponent },
    ])
  ],
  providers: [
    UserService,
    ValidationService,
    AuthGuard,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
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
