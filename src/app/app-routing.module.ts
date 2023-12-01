import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {QuestionFormComponent} from "./question-form/question-form.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./security/auth.guard";
import {MessageFormComponent} from "./message-form/message-form.component";
import {PuzzleSolverComponent} from "./puzzle-solver/puzzle-solver.component";

const routes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'create-message', component: QuestionFormComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterPageComponent},
  {path: 'new-message', component: MessageFormComponent, canActivate: [AuthGuard]},
  { path: ':uniqueId', component: PuzzleSolverComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
