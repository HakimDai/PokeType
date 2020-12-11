import { TestBed } from '@angular/core/testing';

import { ResultsResolverResolver } from './results-resolver.resolver';

describe('ResultsResolverResolver', () => {
  let resolver: ResultsResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResultsResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
