import { TestBed } from '@angular/core/testing';

import { ExternalTemperatureService } from './external-temperature.service';

describe('ExternalTemperatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalTemperatureService = TestBed.get(ExternalTemperatureService);
    expect(service).toBeTruthy();
  });
});
