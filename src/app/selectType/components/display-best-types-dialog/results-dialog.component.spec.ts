import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsDialogComponent } from 'src/app/selectType/components/display-best-types-dialog/results-dialog.component';

describe('DisplayBestTypesDialogComponent', () => {
  let component: ResultsDialogComponent;
  let fixture: ComponentFixture<ResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
