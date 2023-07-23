import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdScreenComponent } from './third-screen.component';

describe('ThirdScreenComponent', () => {
  let component: ThirdScreenComponent;
  let fixture: ComponentFixture<ThirdScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThirdScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
