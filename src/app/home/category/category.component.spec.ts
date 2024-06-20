import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUserComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryUserComponent;
  let fixture: ComponentFixture<CategoryUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryUserComponent]
    });
    fixture = TestBed.createComponent(CategoryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
