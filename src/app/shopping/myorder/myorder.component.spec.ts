import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyorderComponent } from './myorder.component';

describe('MyorderComponent', () => {
  let component: MyorderComponent;
  let fixture: ComponentFixture<MyorderComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
