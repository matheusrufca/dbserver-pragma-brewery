import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BeerContainerTemperatureService } from './beer-container-temperature.service';
import { Observable } from 'rxjs';

describe('BeerContainerTemperatureService', () => {
  let service: BeerContainerTemperatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(BeerContainerTemperatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCurrentTemperature', () => {
    const TEMPERATURE_RANGE = Object.freeze({
      min: 2,
      max: 9,
    });
    const FETCH_INTERVAL: number = 5000;
    const TEMPERATURE_INCREMENT: number = 2;

    it('should return an observable', () => {
      const currentTemperature: Observable<number> = service.getCurrentTemperature();
      expect(currentTemperature).toBeDefined();
    });

    it(`should update temperature value every ${FETCH_INTERVAL}`, fakeAsync(() => {
      let currentTemperature: number, fetchingTimes: number = 0;
      const currentTemperature$: Observable<number> = service.getCurrentTemperature();
      const subscription = currentTemperature$.subscribe((temperature) => {
        currentTemperature = temperature;
        fetchingTimes++;
      });

      tick(FETCH_INTERVAL);
      expect(fetchingTimes).toEqual(1);
      expect(currentTemperature).toBeGreaterThanOrEqual(TEMPERATURE_RANGE.min - TEMPERATURE_INCREMENT);
      expect(currentTemperature).toBeLessThanOrEqual(TEMPERATURE_RANGE.max + TEMPERATURE_INCREMENT);

      tick(FETCH_INTERVAL);
      expect(currentTemperature).toBeGreaterThanOrEqual(TEMPERATURE_RANGE.min - TEMPERATURE_INCREMENT);
      expect(currentTemperature).toBeLessThanOrEqual(TEMPERATURE_RANGE.max + TEMPERATURE_INCREMENT);

      expect(fetchingTimes).toEqual(2);
      expect(currentTemperature).toBeGreaterThanOrEqual(TEMPERATURE_RANGE.min - TEMPERATURE_INCREMENT);
      expect(currentTemperature).toBeLessThanOrEqual(TEMPERATURE_RANGE.max + TEMPERATURE_INCREMENT);

      subscription.unsubscribe();
    }))
  });
});
