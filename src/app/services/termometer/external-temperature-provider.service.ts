import { Injectable } from '@angular/core';
import { Random } from 'random-js';
import { interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const TEMPERATURE_RANGE = Object.freeze({
  Min: 5,
  Max: 40,
});

@Injectable({
  providedIn: 'root'
})
export class ExternalTemperatureProviderService {
  private readonly random: Random;
  private readonly $current: Observable<number>;
  private currentTemperature: number;

  constructor() {
    this.random = new Random();
    this.currentTemperature = this.fetchCurrentTemperature();

    this.$current = interval(2000)
      .pipe(
        tap(this.setCurrentTemperature.bind(this)),
        map((value: any) => {
          return this.fetchCurrentTemperature(this.currentTemperature)
        }));
  }

  getCurrentTemperature(): Observable<number> {
    return this.$current;
  }

  private setCurrentTemperature(current: number): void {
    this.currentTemperature = current;
  }

  private updateCurrentTemperature() {

  }

  private fetchCurrentTemperature(currentTemperature: number = 25): number {
    const minTemperature = TEMPERATURE_RANGE.Min < currentTemperature ? (currentTemperature - 5) : TEMPERATURE_RANGE.Min;
    const maxTemperature = TEMPERATURE_RANGE.Max > currentTemperature ? (currentTemperature + 5) : TEMPERATURE_RANGE.Max;
    return this.random.real(minTemperature, maxTemperature);
  }

}
