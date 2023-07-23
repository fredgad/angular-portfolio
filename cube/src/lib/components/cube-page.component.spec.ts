import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CubePageComponent } from './cube-page.component';

describe('CubeComponent', () => {
  let component: CubePageComponent;
  let fixture: ComponentFixture<CubePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CubePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
