import { TestBed, inject } from '@angular/core/testing';

import { CorporateService } from './corporate.service';

describe('CorporateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorporateService]
    });
  });

  it('should be created', inject([CorporateService], (service: CorporateService) => {
    expect(service).toBeTruthy();
  }));
});
