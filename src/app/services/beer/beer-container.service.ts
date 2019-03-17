import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeerContainerService {
  private readonly apiServiceUrl: string = 'assets/data/beer-ideal-temperatures.json';

  constructor(private readonly httpClient: HttpClient) { }

  getPresets(): Observable<BeerContainerPreset[]> {
    return this.httpClient.get<BeerContainerPreset[]>(this.apiServiceUrl);
  }
}

export interface BeerContainerPreset {
  id: number;
  type: string;
  min: number;
  max: number;
}
