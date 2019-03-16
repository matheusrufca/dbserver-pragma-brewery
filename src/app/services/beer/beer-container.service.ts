import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeerContainerService {

  constructor(private http: HttpClient) { }

  getBeerContainersPresets() {
    return this.http.get('assets/data/beer-ideal-temperatures.json');
  }
}

export interface BeerContainerPreset {
  id: number;
  type: string;
  min: number;
  max: number;
}
