import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedinvoiceComponent } from './importedinvoice.component';

describe('ImportedinvoiceComponent', () => {
  let component: ImportedinvoiceComponent;
  let fixture: ComponentFixture<ImportedinvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportedinvoiceComponent]
    });
    fixture = TestBed.createComponent(ImportedinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
