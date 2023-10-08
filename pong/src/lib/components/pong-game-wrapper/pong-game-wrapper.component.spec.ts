import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PongGameWrapperComponent } from './pong-game-wrapper.component';

describe('PongGameWrapperComponent', () => {
  let component: PongGameWrapperComponent;
  let fixture: ComponentFixture<PongGameWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PongGameWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PongGameWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
