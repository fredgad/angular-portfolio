import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FourthScreenComponent } from './fourth-screen.component';

describe('FourthScreenComponent', () => {
  let component: FourthScreenComponent;
  let fixture: ComponentFixture<FourthScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthScreenComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(FourthScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
