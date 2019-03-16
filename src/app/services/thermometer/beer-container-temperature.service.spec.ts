import { TestBed } from '@angular/core/testing';

import { BeerContainerTemperatureService } from './beer-container-temperature.service';

describe('BeerContainerTemperatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeerContainerTemperatureService = TestBed.get(BeerContainerTemperatureService);
    expect(service).toBeTruthy();
  });
});
