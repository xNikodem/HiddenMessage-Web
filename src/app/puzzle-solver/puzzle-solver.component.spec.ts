import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleSolverComponent } from './puzzle-solver.component';

describe('PuzzleSolverComponent', () => {
  let component: PuzzleSolverComponent;
  let fixture: ComponentFixture<PuzzleSolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleSolverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
