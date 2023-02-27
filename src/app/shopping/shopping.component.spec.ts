import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingComponent } from './shopping.component';

describe('ShoppingComponent', () => {
  let component: ShoppingComponent;
  let fixture: ComponentFixture<ShoppingComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
