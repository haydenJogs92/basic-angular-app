import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

//Services
import { UserService } from '../../services/user-service'
import { ValidationService } from '../../services/validation-service'

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.css'],
})


export class LoginFormComponent
{

  public loginForm: FormGroup;
  public formErrors: boolean = false;
  public bEmailFocused: boolean = false;
  public bPasswordFocused: boolean = false;
  public bIsProcessingLogin: boolean = false;


  constructor( public userService: UserService,
               public form: FormBuilder) {}

    ngOnInit()
    {
      this.initializeLoginForm();
    }


    initializeLoginForm()
    {
      this.loginForm = this.form.group({
        sEmail : ['', [Validators.required, ValidationService.isEmailValid] ],
        sPassword : ['', Validators.required],
        });
    }

    displayValidationState( keyName: string )
    {
      let formInput = (<FormControl>this.loginForm.controls[keyName]);
      if ( formInput.touched  )
      {
        if ( formInput.valid )
        {
          return 'validInput'
        }
        else
        {
          return 'invalidInput';
        }
      }
    }


    clearInput( keyName: string )
    {
      (<FormControl>this.loginForm.controls[keyName]).setValue("");
      (<FormControl>this.loginForm.controls[keyName]).markAsUntouched();
    }

    isValueSet( keyName: string )
    {
      return this.loginForm.controls[keyName].value != "" ? true : false;
    }



    loginUser()
    {
      this.bIsProcessingLogin = true;
      this.userService.userLoginRequest( this.loginForm.value.sEmail, this.loginForm.value.sPassword )
      .subscribe( result => {
          if ( !result )
          {
            this.formErrors = true;
          }
          this.bIsProcessingLogin = false;
      })


      //
    }

    showFormErrors()
    {
      for (var key in this.loginForm.controls)
      {
        this.loginForm.controls[key].markAsTouched();
      }
      this.formErrors = true;
    }


    delayBlurEmail()
    {
      setTimeout( () => {this.bEmailFocused =false;},200 )
    }
    delayBlurPassword()
    {
      setTimeout( () => {this.bPasswordFocused =false;},200 )
    }

}
