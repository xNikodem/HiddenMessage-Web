import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth/auth.service";
import labelsData from '../../assets/i18n/messages.json';
import routesData from '../../assets/paths.json';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  public loginError: string | null = null;
  public labels = labelsData.loginPage;
  private routes = routesData.routes;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
  }

  public onSubmit(): void {
    this.loginError = null;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/' + this.routes.main]);
        },
        () => {
          this.loginError = this.labels.invalidCredentials;
        }
      );
    }
  }

  public navigateToRegister(): void {
    this.router.navigate(['/' + this.routes.register]);
  }
}
