import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingHistoryPage } from './billing-history.page';

describe('BillingHistoryPage', () => {
  let component: BillingHistoryPage;
  let fixture: ComponentFixture<BillingHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
