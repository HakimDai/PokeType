import { TestBed } from '@angular/core/testing';

import { RequestPokemonService } from './request-pokemon.service';

describe('RequestPokemonService', () => {
  let service: RequestPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
