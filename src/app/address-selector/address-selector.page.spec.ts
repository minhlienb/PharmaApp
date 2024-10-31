import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressSelectorPage } from './address-selector.page';

describe('AddressSelectorPage', () => {
  let component: AddressSelectorPage;
  let fixture: ComponentFixture<AddressSelectorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
