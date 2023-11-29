import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {UserDto} from "../dto/user.dto";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public registerForm!: FormGroup;
  public isSubmitted = false;
  public  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
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
      const userDto: UserDto = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value
      };
      this.authService.register(userDto).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['/main'])
        },
        error => {
          console.log(error)
          this.errorMessage = error.error
        }
      );
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
