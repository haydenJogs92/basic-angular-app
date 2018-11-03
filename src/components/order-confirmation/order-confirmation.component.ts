import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/user-service'
import { Order } from '../../models/models'

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {


  public orderDetails:Order;
  constructor( public route: ActivatedRoute, public userService: UserService ) { }

  ngOnInit()
  {
    this.orderDetails = this.route.snapshot.data['orderDetails'];
  }

}
