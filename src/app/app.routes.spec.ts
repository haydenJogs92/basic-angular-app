//unit tests for app routes

import { routes } from './app.routes'
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { OrderHistoryComponent } from '../components/order-history/order-history.component';
import { UpdateDetailsComponent } from '../components/update-details/update-details.component';
import { MakeOrderComponent } from '../components/make-order/make-order.component';
import { AuthGuard } from '../services/auth-guard-service';

describe('routes', () => {

  it('should contain a route for /', () => {
    expect( routes ).toContain( { path: '', component: HomeComponent } )
  });

  it('should contain a route for /login', () => {
    expect( routes ).toContain( { path: 'login', component: LoginComponent } )
  });

  it('should contain a route for /user-details', () => {
    expect( routes ).toContain( { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuard]  } )
  });

  it('should contain a route for /user-details/update-info', () => {
    expect( routes ).toContain( { path: 'user-details/update-info', component: UpdateDetailsComponent, canActivate: [AuthGuard]  } )
  });

  it('should contain a route for /user-details/make-order', () => {
    expect( routes ).toContain( { path: 'user-details/make-order', component: MakeOrderComponent, canActivate: [AuthGuard]  } )
  });

  it('should contain a route for /user-details/order-history', () => {
    expect( routes ).toContain( { path: 'user-details/order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] } )
  });




})
