import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card.component';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
