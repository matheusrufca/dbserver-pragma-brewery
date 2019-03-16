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
  readonly externalTemperature: Observable<number>;

  constructor(
    private readonly externalTemperatureService: ExternalTemperatureService,
    private readonly beerContainerService: BeerContainerService
  ) {
    this.model = {
      beerContainers: [],
    } as DashboardModel;

    // TODO: move to component
    this.externalTemperature = this.externalTemperatureService.getCurrentTemperature();
  }

  ngOnInit() {
    this.loadBeerContainersPresets();
    this.externalTemperature.subscribe(this.onExternalTemperatureChange.bind(this));
  }


  private setExternalTemperature(temperature: number) {
    this.model.externalTemperature = temperature.toFixed(2);
  }

  private onExternalTemperatureChange(currentTemperature: number): void {
    this.setExternalTemperature(currentTemperature);
    // console.debug('DashboardComponent:onExternalTemperatureChange()', currentTemperature);
  }

  private loadBeerContainersPresets(): void {
    this.beerContainerService.getBeerContainersPresets()
      .subscribe(this.setBeerContainers.bind(this))
  }

  private setBeerContainers(presets: BeerContainerPreset[]) {
    console.debug('containers', presets);
    this.model.beerContainers = presets;
  }
}

interface DashboardModel {
  externalTemperature: string,
  beerContainers: BeerContainerPreset[],
}

