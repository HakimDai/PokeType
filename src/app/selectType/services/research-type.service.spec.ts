import { TestBed } from '@angular/core/testing';

import { ResearchTypeService } from 'src/app/selectType/services/research-type.service';

describe('ResearchTypeService', () => {
  let service: ResearchTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
