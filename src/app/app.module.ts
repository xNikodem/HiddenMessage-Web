import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import {MainPageComponent} from './main-page/main-page.component';
import {QuestionFormComponent} from './question-form/question-form.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageComponent} from './login-page/login-page.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RegisterPageComponent} from './register-page/register-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./security/jwt.interceptor";
import {MessageFormComponent} from './message-form/message-form.component';
import {PuzzleSolverComponent} from './puzzle-solver/puzzle-solver.component';
import {InteractiveBackgroundComponent} from './interactive-background/interactive-background.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    QuestionFormComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MessageFormComponent,
    PuzzleSolverComponent,
    InteractiveBackgroundComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
