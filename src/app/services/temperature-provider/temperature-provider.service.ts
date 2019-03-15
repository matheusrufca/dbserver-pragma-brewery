import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemperatureProviderService {

  constructor() { }

  currentTemperature: number;
  currentExternalTemperature: number;
}
