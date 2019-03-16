import { TestBed } from '@angular/core/testing';

import { BeerContainerService } from './beer-container.service';

describe('BeerContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeerContainerService = TestBed.get(BeerContainerService);
    expect(service).toBeTruthy();
  });
});
