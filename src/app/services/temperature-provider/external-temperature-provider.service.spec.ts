import { TestBed } from '@angular/core/testing';

import { ExternalTemperatureProviderService } from './external-temperature-provider.service';

describe('ExternalTemperatureProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalTemperatureProviderService = TestBed.get(ExternalTemperatureProviderService);
    expect(service).toBeTruthy();
  });
});
