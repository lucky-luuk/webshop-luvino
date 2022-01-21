import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdminItemComponent } from './order-admin-item.component';

describe('OrderItemComponent', () => {
  let component: OrderAdminItemComponent;
  let fixture: ComponentFixture<OrderAdminItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAdminItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAdminItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
