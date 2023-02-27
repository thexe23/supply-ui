import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllComponent } from './all.component';

describe('AllComponent', () => {
  let component: AllComponent;
  let fixture: ComponentFixture<AllComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
