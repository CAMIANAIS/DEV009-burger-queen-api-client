import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyOrdersViewComponent } from './ready-orders.view.component';

describe('ReadyOrdersViewComponent', () => {
  let component: ReadyOrdersViewComponent;
  let fixture: ComponentFixture<ReadyOrdersViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadyOrdersViewComponent]
    });
    fixture = TestBed.createComponent(ReadyOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
