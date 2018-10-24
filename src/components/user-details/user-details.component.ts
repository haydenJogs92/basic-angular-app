import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'

import {UserData} from '../../models/models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userData: UserData;
  public firstInitial: string;
  public lastInitial: string;
  public showOrderHistory: boolean = false;

  constructor( public userService: UserService ) { }

  ngOnInit()
  {
      this.userData = this.userService.getUserInfoFromStorage();
      this.firstInitial = this.userData.nameFirst.substring(0,1);
      this.lastInitial = this.userData.nameLast.substring(0,1);
  }



}
