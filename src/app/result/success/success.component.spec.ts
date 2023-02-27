import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessComponent } from './success.component';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
