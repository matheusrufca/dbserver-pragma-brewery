import { Injectable } from '@angular/core';
import { Random } from 'random-js';
import { interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TemperatureRange } from 'src/app/models/temperature-range';

const TEMPERATURE_RANGE: TemperatureRange = Object.freeze({
  min: 2,
  max: 9,
});
const FETCH_INTERVAL: number = 5000;
const TEMPERATURE_INCREMENT: number = 2;

@Injectable({
  providedIn: 'root'
})
export class BeerContainerTemperatureService {
  private readonly random: Random;
  private readonly currentTemperature$: Observable<number>;
  private currentTemperature: number;

  constructor() {
    this.random = new Random();
    this.currentTemperature = this.random.real(TEMPERATURE_RANGE.min, TEMPERATURE_RANGE.max);
    this.currentTemperature$ = interval(FETCH_INTERVAL)
      .pipe(
        map((value: any) => this.fetchCurrentTemperature(this.currentTemperature)),
        tap(this.setCurrentTemperature.bind(this))
      );
  }

  getCurrentTemperature(): Observable<number> {
    return this.currentTemperature$;
  }

  private fetchCurrentTemperature(temperature: number): number {
    return this.random.real(temperature - TEMPERATURE_INCREMENT, temperature + TEMPERATURE_INCREMENT);
  }

  private setCurrentTemperature(temperature: number): void {
    if (temperature > TEMPERATURE_RANGE.max)
      temperature = TEMPERATURE_RANGE.max;
    else if (temperature < TEMPERATURE_RANGE.min)
      temperature = TEMPERATURE_RANGE.min;

    this.currentTemperature = temperature;
  }
}
