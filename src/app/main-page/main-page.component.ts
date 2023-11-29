import { Component, OnInit, HostListener } from '@angular/core';
import {SnackbarService} from "../notifications/snackbar.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private interBubble: HTMLDivElement | null = null;
  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;

  ngOnInit(): void {
    this.interBubble = document.querySelector('.interactive');
    this.move();
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

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.tgX = event.clientX;
    this.tgY = event.clientY;
  }
}
