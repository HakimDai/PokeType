import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBestTypesDialogComponent } from './display-best-types-dialog.component';

describe('DisplayBestTypesDialogComponent', () => {
  let component: DisplayBestTypesDialogComponent;
  let fixture: ComponentFixture<DisplayBestTypesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayBestTypesDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBestTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
