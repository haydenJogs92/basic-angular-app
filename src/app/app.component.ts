import { Component } from '@angular/core';
import {UserService} from '../services/user-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public userService: UserService){}

  ngOnInit()
  {
    //here we use UserID to contruct routes in the app ex: user/:id/make-order
    //to allow this, we store the user ID in local storage so that it is persistent, even when a page is refreshed
    //this method retrieves the user ID and then sets it as a property of UserService
    this.userService.setUserIDFromStorage();
  }

}
