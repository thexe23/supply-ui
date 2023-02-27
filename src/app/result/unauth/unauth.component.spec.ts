import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnauthComponent } from './unauth.component';

describe('UnauthComponent', () => {
  let component: UnauthComponent;
  let fixture: ComponentFixture<UnauthComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
