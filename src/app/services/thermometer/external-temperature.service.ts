import { Injectable } from '@angular/core';
import { Random } from 'random-js';
import { interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const TEMPERATURE_RANGE = Object.freeze({
  min: 5,
  max: 40,
});

@Injectable({
  providedIn: 'root'
})
export class ExternalTemperatureService {
  private readonly random: Random;
  private readonly $current: Observable<number>;
  private currentTemperature: number;

  constructor() {
    this.random = new Random();
    this.currentTemperature = this.fetchCurrentTemperature();

    this.$current = interval(2000)
      .pipe(
        tap(this.setCurrentTemperature.bind(this)),
        map((value: number) => this.fetchCurrentTemperature(this.currentTemperature))
      );
  }

  getCurrentTemperature(): Observable<number> {
    return this.$current;
  }

  private setCurrentTemperature(current: number): void {
    this.currentTemperature = current;
  }

  private fetchCurrentTemperature(currentTemperature: number = 25): number {
    // const minTemperature = TEMPERATURE_RANGE.min < currentTemperature ? (currentTemperature - 5) : TEMPERATURE_RANGE.min;
    // const maxTemperature = TEMPERATURE_RANGE.max > currentTemperature ? (currentTemperature + 5) : TEMPERATURE_RANGE.max;
    return this.random.real(TEMPERATURE_RANGE.min, TEMPERATURE_RANGE.max);
  }

}
