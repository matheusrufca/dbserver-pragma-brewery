import { Injectable } from '@angular/core';
import { Random } from 'random-js';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const TEMPERATURE_RANGE = Object.freeze({
  Min: -50,
  Max: 200,
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

    this.$current = interval(2000)
      .pipe(
        map((value: any) => {
          const currentTemperature = this.fetchCurrentTemperature(this.currentTemperature);
          this.updateCurrentTemperature(currentTemperature);
          return currentTemperature;
        }));
  }

  getCurrentTemperature(): Observable<number> {
    return this.$current;
  }

  private fetchCurrentTemperature(currentTemperature: number = 15): number {
    const minTemperature = TEMPERATURE_RANGE.Min < currentTemperature ? (currentTemperature - 30) : TEMPERATURE_RANGE.Min;
    const maxTemperature = TEMPERATURE_RANGE.Max > currentTemperature ? (currentTemperature + 30) : TEMPERATURE_RANGE.Max;
    return this.random.real(minTemperature, maxTemperature);
  }

  private updateCurrentTemperature(current: number): void {
    this.currentTemperature = current;
  }
}
