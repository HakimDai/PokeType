import { TestBed } from '@angular/core/testing';

import { ResultsResolver } from 'src/app/selectType/resolvers/results-resolver.service';

describe('ResultsResolverResolver', () => {
  let resolver: ResultsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResultsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
