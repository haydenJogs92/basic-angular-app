import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  //styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private navBarOpen: boolean = false;

  constructor( private userService: UserService ) { }

  ngOnInit() {
  }


}
