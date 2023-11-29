import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  public loginError: string | null = null;
  private interBubble: HTMLDivElement | null = null;
  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.interBubble = document.querySelector('.interactive');
    this.move();
    this.authService.logout();
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: token => {
          this.router.navigate(['/main']);
        },
        error: error => {
          this.loginError = error.error;
        }
      });
    }
  }

  @HostListener('window:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    this.tgX = event.clientX;
    this.tgY = event.clientY;
  }

  public navigateToRegister() {
    this.router.navigate(['/register']);
  }

  private move() {
    if (!this.interBubble) return;

    this.curX += (this.tgX - this.curX) / 20;
    this.curY += (this.tgY - this.curY) / 20;
    this.interBubble.style.transform = `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`;

    requestAnimationFrame(() => {
      this.move();
    });
  }
}
