import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input('orderDetails') orderDetails;
  @Input('bIsCompletedOrder') bIsCompletedOrder;
  
  constructor() { }

  ngOnInit() {
  }

}
