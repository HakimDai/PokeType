import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypePageComponent } from 'src/app/selectType/pages/select-type-page/select-type-page.component';

describe('HomePageComponent', () => {
  let component: SelectTypePageComponent;
  let fixture: ComponentFixture<SelectTypePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTypePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
