import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation-service'
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/user-service'

import {UserData} from '../../models/models';

@Component({
  selector: 'update-details-form',
  templateUrl: './update-details-form.component.html',
  styleUrls: ['./update-details-form.component.css']
})
export class UpdateDetailsFormComponent implements OnInit {


    public updateDetailsForm: FormGroup;
    public bFormErrors: boolean = false;
    public userData: UserData;
    public bUpdateSuccess: boolean = false;
    public bUpdatingUserInfo: boolean = false;

  constructor( public form: FormBuilder,
               public userService: UserService,
               public route: ActivatedRoute) {}

  ngOnInit()
  {
    this.userData = this.route.snapshot.data['userDetails'];
    this.initializeUpdateDetailsForm();
  }

  initializeUpdateDetailsForm()
  {
    this.updateDetailsForm = this.form.group({
      sFirstName: ['', Validators.required],
      sLastName: ['', Validators.required],
      sPhone: ['',  [Validators.required, ValidationService.isPhoneValid] ],
      sEmail : ['', [Validators.required, ValidationService.isEmailValid] ],
      });

      this.setFormValues();
  }


  setFormValues()
  {
    if ( this.userService.isUserLoggedIn() )
    {
      if ( this.userData )
      {
        (<FormControl>this.updateDetailsForm.controls['sFirstName']).setValue( this.userData.nameFirst );
        (<FormControl>this.updateDetailsForm.controls['sLastName']).setValue( this.userData.nameLast );
        (<FormControl>this.updateDetailsForm.controls['sEmail']).setValue( this.userData.email );
        (<FormControl>this.updateDetailsForm.controls['sPhone']).setValue( this.userData.phone );
      }
    }
  }

  showFormErrors()
  {
    for (var key in this.updateDetailsForm.controls)
    {
      this.updateDetailsForm.controls[key].markAsTouched();
    }
    this.bFormErrors = true;
  }



  updateDetails()
  {
    this.bUpdatingUserInfo = true;
    this.userService.userUpdateDetails( this.updateDetailsForm.value )
    .subscribe( result => {
        if ( result )
        {          
          this.bFormErrors = false;
          this.bUpdateSuccess = true;
        }
        else
        {
          this.bFormErrors = true;
        }
        this.bUpdatingUserInfo = false;
    });

  }




}
