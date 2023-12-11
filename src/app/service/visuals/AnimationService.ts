import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private interBubble: HTMLDivElement | null = null;
  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;
  private shouldAnimate = true;
  private isAnimationInitialized = false;

  public initialize(interBubble: HTMLDivElement): void {
    if (this.isAnimationInitialized) {
      return;
    }
    this.interBubble = interBubble;
    this.shouldAnimate = true;
    this.move();
    this.isAnimationInitialized = true;
  }

  public stopAnimation(): void {
    this.shouldAnimate = false;
    this.isAnimationInitialized = false;
  }

  public updateTarget(x: number, y: number): void {
    this.tgX = x;
    this.tgY = y;
  }

  private move(): void {
    if (!this.shouldAnimate || !this.interBubble) return;

    this.curX += (this.tgX - this.curX) / 20;
    this.curY += (this.tgY - this.curY) / 20;
    this.interBubble.style.transform = `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`;
    requestAnimationFrame(() => this.move());
  }
}
