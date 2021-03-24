import { TestBed } from '@angular/core/testing';

import { AuthenticatedFeaturesService } from './authenticated-features.service';

describe('AuthenticatedFeaturesService', () => {
  let service: AuthenticatedFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticatedFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
