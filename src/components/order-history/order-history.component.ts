import { Component, OnInit } from '@angular/core';
import { UserOrderHistory, Order } from  '../../models/models';
import { UserService } from '../../services/user-service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {


  public userOrderHistory: UserOrderHistory;
  public aShowOrderDetailsIDs: Array<number> = [];

  constructor( public userService: UserService, public route: ActivatedRoute) { }

  ngOnInit()
  {
    this.userOrderHistory = this.route.snapshot.data['orderHistory'];
  }


  showOrderDetails( orderID: number )
  {    
    let index = this.aShowOrderDetailsIDs.indexOf( orderID );
    //if not showing, show order info
    if ( index == -1 )
    {
      this.aShowOrderDetailsIDs.push( orderID );
    }
    //else hide order info
    else
    {
      this.aShowOrderDetailsIDs.splice( index, 1 );
    }
  }

  isOrderDetailsVisible( orderID: number )
  {
    return this.aShowOrderDetailsIDs.indexOf( orderID ) != -1 ? false : true;
  }

}
