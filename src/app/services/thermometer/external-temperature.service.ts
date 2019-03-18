import { Injectable } from '@angular/core';
import { Random } from 'random-js';
import { interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const TEMPERATURE_RANGE = Object.freeze({
  min: 0,
  max: 40,
});
const FETCH_INTERVAL = 2000;
const TEMPERATURE_INCREMENT = 5;

@Injectable({
  providedIn: 'root'
})
export class ExternalTemperatureService {
  private readonly random: Random;
  private readonly currentTemperature$: Observable<number>;
  private currentTemperature: number;

  constructor() {
    this.random = new Random();
    this.currentTemperature = this.fetchCurrentTemperature();

    this.currentTemperature$ = interval(FETCH_INTERVAL)
      .pipe(
        map((value: number) => this.fetchCurrentTemperature(this.currentTemperature)),
        tap(this.setCurrentTemperature.bind(this))
      );
  }

  getCurrentTemperature(): Observable<number> {
    return this.currentTemperature$;
  }

  private fetchCurrentTemperature(temperature: number = 25): number {
    return this.random.real(temperature - TEMPERATURE_INCREMENT, temperature + TEMPERATURE_INCREMENT);
  }

  private setCurrentTemperature(temperature: number): void {
    if (temperature > TEMPERATURE_RANGE.max)
      temperature = TEMPERATURE_RANGE.max;
    else if (temperature < TEMPERATURE_RANGE.min)
      temperature = TEMPERATURE_RANGE.min

    this.currentTemperature = temperature;
  }
}
