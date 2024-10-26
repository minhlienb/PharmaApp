import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailPagePage } from './product-detail-page.page';

describe('ProductDetailPagePage', () => {
  let component: ProductDetailPagePage;
  let fixture: ComponentFixture<ProductDetailPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
