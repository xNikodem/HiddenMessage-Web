import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public registerForm!: FormGroup;
  public isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  public onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      console.log("valid");
    }
  }

  public isFieldInvalid(fieldName: string, errorType: string): boolean {
    const control = this.registerForm.get(fieldName);
    return !!control && control.hasError(errorType) && (control.touched || this.isSubmitted);
  }

  private mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({mustMatch: true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
