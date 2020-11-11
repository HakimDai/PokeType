import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesToSelectComponent } from './types-to-select.component';

describe('TypesToSelectComponent', () => {
  let component: TypesToSelectComponent;
  let fixture: ComponentFixture<TypesToSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypesToSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesToSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
