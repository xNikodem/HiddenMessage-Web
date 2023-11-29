import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {QuestionFormComponent} from "./question-form/question-form.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";

const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'create-message', component: QuestionFormComponent},
  {path: 'register', component: RegisterPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
