import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BeerContainerService } from 'src/app/services/beer/beer-container.service';
import { ExternalTemperatureService } from 'src/app/services/thermometer/external-temperature.service';
import { BeerContainerPreset } from './../../services/beer/beer-container.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly model: DashboardModel;

  constructor(private readonly beerContainerService: BeerContainerService) {
    this.model = {
      beerContainers: [],
    } as DashboardModel;
  }

  ngOnInit() {
    this.loadBeerContainersPresets();
  }

  private loadBeerContainersPresets(): void {
    this.beerContainerService.getPresets().subscribe(
      this.setBeerContainers.bind(this),
      this.handleLoadingError.bind(this)
    );
  }

  private setBeerContainers(presets: BeerContainerPreset[]): void {
    this.model.beerContainers = presets;
  }

  private handleLoadingError(error: any): void {
    // TODO: notify load error
    console.error('An error ocurred during dashboard loading', error);
  }
}

interface DashboardModel {
  externalTemperature: string,
  beerContainers: BeerContainerPreset[],
}

