import {AfterViewInit, Component, HostListener} from '@angular/core';
import {AnimationService} from "../service/visuals/AnimationService";

@Component({
  selector: 'app-interactive-background',
  templateUrl: './interactive-background.component.html',
  styleUrls: ['./interactive-background.component.scss']
})
export class InteractiveBackgroundComponent implements AfterViewInit {
  constructor(private animationService: AnimationService) {
  }

  public ngAfterViewInit(): void {
    const interBubble = document.querySelector('.interactive') as HTMLDivElement;
    if (interBubble) {
      this.animationService.stopAnimation();
      this.animationService.initialize(interBubble);
    }
  }

  public ngOnDestroy(): void {
    this.animationService.stopAnimation();
  }

  @HostListener('window:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent): void {
    this.animationService.updateTarget(event.clientX, event.clientY);
  }
}
