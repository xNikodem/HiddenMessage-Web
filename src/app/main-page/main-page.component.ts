import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import labelsData from '../../assets/i18n/messages.json';
import routesData from '../../assets/paths.json';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  public labels = labelsData.main;
  private routes = routesData.routes

  constructor(private router: Router) {
  }

  public create(): void {
    this.router.navigate(['/'+this.routes.createPuzzle]);
  }

}
