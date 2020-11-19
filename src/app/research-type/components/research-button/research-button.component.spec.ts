import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchButtonComponent } from './research-button.component';

describe('ResearchButtonComponent', () => {
  let component: ResearchButtonComponent;
  let fixture: ComponentFixture<ResearchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResearchButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
