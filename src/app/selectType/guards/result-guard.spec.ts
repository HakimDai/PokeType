import { TestBed } from '@angular/core/testing';

import { ResultGuard } from 'src/app/selectType/guards/result-guard.service';

describe('ResultGuardGuard', () => {
  let guard: ResultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
