import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeCubeComponent } from './edge-cube.component';

describe('EdgeCubeComponent', () => {
  let component: EdgeCubeComponent;
  let fixture: ComponentFixture<EdgeCubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EdgeCubeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdgeCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
