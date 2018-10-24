import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  //styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public navBarOpen: boolean = false;

  constructor( public userService: UserService ) { }

  ngOnInit()
  {    }


}
