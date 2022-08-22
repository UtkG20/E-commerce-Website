import { TestBed } from '@angular/core/testing';

import { CountryFilterService } from './country-filter.service';

describe('CountryFilterService', () => {
  let service: CountryFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
