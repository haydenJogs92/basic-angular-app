

import {Injectable} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Injectable()
export class ValidationService
{
  constructor(){}



  /*
  Angular has built-in form validators like required, isNumberValid etc
  But we can build custom form validators to attach to our form group : http://www.joshmorony.com/advanced-forms-validation-in-ionic-2/
  This method takes a formControl (in this case, the form control for a form's phone number input )
  It uses the same validation code from the last iteration of the app
  If valid, return null
  If invalid, return an object to let component know what is invalid about the input
  Please note: custom form validators must be static methods
  */
  
  static isPhoneValid(control: FormControl)
  {
    var bReturn = false;
    let strPhone = control.value.trim( control.value ).replace( /[^0-9]/gi, '' );
    if ( strPhone.length >= 10 || strPhone.length === 7 )
    {
      bReturn = true;
    }

    if (bReturn)
    {
      /* return null if input is valid */
      return null;
    }
    else
    {
    /* return an object if input is invalid  */
    return { invalidPhone: true };
    }
  }

  /*
  Angular custom validator for Email
  */
  static isEmailValid(control: FormControl)
  {
    let bValid = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test( control.value );

    if ( bValid )
    {
      /* email is valid  */
      return null;
    }
    else
    {
      /* email invalid, return error object */
      return { invalidEmail: true}
    }
  }



  /*
  Validates for US zip codes only. If country is not US, this validator is removed from the form group
  */
  static validateZipCode ( control:FormControl )
  {
    let strZip = control.value.trim(control.value);
  	let bValid = ( /^[0-9]{5}(-[0-9]{4})?$/.test( strZip  ) || /^([A-Z][0-9]){5}$/.test(strZip) ) ? true : false;
    if ( bValid )
    {
      return null;
    }
    else
    {
      return { invalidZipCode: true }
    }
  }


  /*
  Add This Custom Validator If You Want To Require A Check Box To Be Checked For A Form To Be Valid
  */
  static isChecked(control: FormControl)
  {
    var bReturn = control.value;
    if (bReturn)
    {
      /* return null if input is valid */
      return null;
    }
    else
    {
    /* return an object if input is invalid  */
    return { boxUnchecked: true };
    }
  }



}
