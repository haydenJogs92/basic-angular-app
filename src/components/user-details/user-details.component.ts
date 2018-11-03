import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'
import { ActivatedRoute } from '@angular/router'
import {UserData} from '../../models/models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userDetails: UserData;
  public firstInitial: string;
  public lastInitial: string;

  constructor( public userService: UserService, public route: ActivatedRoute ) { }

  ngOnInit()
  {
      this.userDetails = this.route.snapshot.data['userDetails'];
      if ( this.userDetails != null )
      {
        this.firstInitial = this.userDetails.nameFirst.substring(0,1);
        this.lastInitial = this.userDetails.nameLast.substring(0,1);
      }
  }

}
