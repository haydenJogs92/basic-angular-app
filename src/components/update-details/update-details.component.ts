import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service'

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

}
