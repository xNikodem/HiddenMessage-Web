import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";
import {UserDto} from "../dto/user.dto";
import labelsData from "../../assets/i18n/messages.json";
import routesData from "../../assets/paths.json";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public registerForm!: FormGroup;
  public isSubmitted = false;
  public errorMessage: string = '';
  public labels = labelsData.registerPage;
  private routes = routesData.routes;
  private readonly USERNAME_KEY = 'username';
  private readonly PASSWORD_KEY = 'password';
  private readonly CONFIRM_PASSWORD_KEY = 'confirmPassword';
  private readonly MUSTMATCH_KEY = 'mustMatch';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.mustMatch(this.PASSWORD_KEY, this.CONFIRM_PASSWORD_KEY)
    });
  }

  public onSubmit(): void {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      const userDto: UserDto = {
        username: this.registerForm.get(this.USERNAME_KEY)?.value,
        password: this.registerForm.get(this.PASSWORD_KEY)?.value
      };
      this.authService.register(userDto).subscribe(
        response => {
          this.router.navigate(['/'+this.routes.login])
        },
        error => {
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

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors[this.MUSTMATCH_KEY]) {
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
