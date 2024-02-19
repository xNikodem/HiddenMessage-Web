import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {QuestionFormComponent} from "./question-form/question-form.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./security/auth.guard";
import {MessageFormComponent} from "./message-form/message-form.component";
import {PuzzleSolverComponent} from "./puzzle-solver/puzzle-solver.component";
import routesData from "../assets/paths.json";

const routes: Routes = [
  {path: routesData.routes.main, component: MainPageComponent, canActivate: [AuthGuard]},
  {path: routesData.routes.login, component: LoginPageComponent},
  {path: '', redirectTo: '/'+routesData.routes.login, pathMatch: 'full'},
  {path: routesData.routes.createPuzzle, component: QuestionFormComponent, canActivate: [AuthGuard]},
  {path: routesData.routes.register, component: RegisterPageComponent},
  {path: routesData.routes.createMessage, component: MessageFormComponent, canActivate: [AuthGuard]},
  {path: ':'+routesData.routes.uniqueId, component: PuzzleSolverComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
