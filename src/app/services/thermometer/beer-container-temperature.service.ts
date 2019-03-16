import { Injectable } from '@angular/core';
import { Random } from 'random-js';
import { interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const TEMPERATURE_RANGE = Object.freeze({
  min: 0,
  max: 10,
});

@Injectable({
  providedIn: 'root'
})
export class BeerContainerTemperatureService {
  private readonly random: Random;
  private readonly $current: Observable<number>;
  private currentTemperature: number;

  constructor() {
    this.random = new Random();
    this.currentTemperature = this.fetchCurrentTemperature();

    this.$current = interval(5000)
      .pipe(
        tap(this.setCurrentTemperature.bind(this)),
        map((value: any) => this.fetchCurrentTemperature(this.currentTemperature))
      );
  }

  getCurrentTemperature(): Observable<number> {
    return this.$current;
  }

  private fetchCurrentTemperature(currentTemperature: number = 15): number {
    // const minTemperature = TEMPERATURE_RANGE.min < currentTemperature ? (currentTemperature - 30) : TEMPERATURE_RANGE.min;
    // const maxTemperature = TEMPERATURE_RANGE.max > currentTemperature ? (currentTemperature + 30) : TEMPERATURE_RANGE.max;
    return this.random.real(TEMPERATURE_RANGE.min, TEMPERATURE_RANGE.max);
  }

  private setCurrentTemperature(current: number): void {
    this.currentTemperature = current;
  }
}
