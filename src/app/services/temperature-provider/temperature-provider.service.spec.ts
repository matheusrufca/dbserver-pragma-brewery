import { TestBed } from '@angular/core/testing';

import { TemperatureProviderService } from './temperature-provider.service';

describe('TemperatureProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemperatureProviderService = TestBed.get(TemperatureProviderService);
    expect(service).toBeTruthy();
  });
});
