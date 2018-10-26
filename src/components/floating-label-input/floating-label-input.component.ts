import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'floating-label-input',
  templateUrl: './floating-label-input.component.html',
  styleUrls: ['./floating-label-input.component.css']
})
export class FloatingLabelInputComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() formControlNameString: string = "";
  @Input() labelName: string = "";
  @Input() inputType: string;
  @Input() maxLength: number;
  public bIsInputFocused: boolean = false;

  constructor() { }

  ngOnInit(){}

  //check if this current input's value is set
  isValueSet()
  {
    return this.parentForm.controls[this.formControlNameString].value != "" ? true : false;
  }

  //check if this input is valid according to validators defined in parent form
  //return css class to apply to reflect current validation state
  displayValidationState()
  {
    let formInput = (<FormControl>this.parentForm.controls[  this.formControlNameString ]);
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


  //delay setting input value focused to false to allow time for the clear input button to be pressed
  delayInputBlur()
  {
    setTimeout( () => {this.bIsInputFocused = false;},200 )
  }

  //clear this input and mark it as untouched in the parent form
  clearInput()
  {
    (<FormControl>this.parentForm.controls[this.formControlNameString]).setValue("");
    (<FormControl>this.parentForm.controls[this.formControlNameString]).markAsUntouched();
  }


}
