

//components
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { OrderHistoryComponent } from '../components/order-history/order-history.component';
import { UpdateDetailsComponent } from '../components/update-details/update-details.component';
import { MakeOrderComponent } from '../components/make-order/make-order.component';
import { OrderConfirmationComponent } from '../components/order-confirmation/order-confirmation.component';
import { NotFoundComponent } from '../components/notfound/notfound.component';

//resolvers
import{ UserDetailsResolve } from '../resolvers/user-details.resolve';
import{ OrderHistoryResolve } from '../resolvers/order-history.resolve';
import { OrderProductsListResolve } from '../resolvers/order-products-list.resolve';
import { OrderConfirmationResolve } from '../resolvers/order-confirmation.resolve';

//authguard
import { AuthGuard } from '../services/auth-guard-service';



export const routes = [
  {path: '',  component: HomeComponent },
  {path: 'login',  component: LoginComponent },
  {path: 'user/:id',
   component: UserDetailsComponent,

   //protect this route from unnauthorized users
   canActivate: [AuthGuard],
   resolve: { userDetails: UserDetailsResolve },
  },
  {path: 'user/:id/update-info',
   component: UpdateDetailsComponent,
   canActivate: [AuthGuard],
   resolve: { userDetails: UserDetailsResolve },
  },
  {path: 'user/:id/make-order',
   component: MakeOrderComponent,
   canActivate: [AuthGuard],
   resolve: { productList: OrderProductsListResolve },
  },
  {path: 'user/:id/confirmation/:orderID',
   component: OrderConfirmationComponent,
   canActivate: [AuthGuard],
   resolve: { orderDetails: OrderConfirmationResolve },
  },
  {path: 'user/:id/order-history',
   component: OrderHistoryComponent,
   canActivate: [AuthGuard],
   resolve: { orderHistory: OrderHistoryResolve },
  },
  //404 page
  {path: '**',  component: NotFoundComponent },
];
