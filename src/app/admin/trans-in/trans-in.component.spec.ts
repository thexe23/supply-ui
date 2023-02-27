import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransInComponent } from './trans-in.component';

describe('TransInComponent', () => {
  let component: TransInComponent;
  let fixture: ComponentFixture<TransInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
