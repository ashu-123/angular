import { TestBed } from '@angular/core/testing';

import { FiltersClassService } from './filters-class.service';

describe('FiltersClassService', () => {
  let service: FiltersClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
