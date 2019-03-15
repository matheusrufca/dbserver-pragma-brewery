import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExternalTemperatureProviderService } from 'src/app/services/termometer/external-temperature-provider.service';
import { BeerContainer } from '../beer-container/beer-container.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly model: DashboardModel;
  readonly externalTemperature: Observable<number>;

  constructor(private readonly externalTemperatureProvider: ExternalTemperatureProviderService) {
    this.model = {} as DashboardModel;
    this.externalTemperature = this.externalTemperatureProvider.getCurrentTemperature();
  }

  ngOnInit() {
    this.externalTemperature.subscribe(this.onExternalTemperatureChange.bind(this));
  }


  private setExternalTemperature(temperature: number) {
    this.model.externalTemperature = temperature.toFixed(2);
  }

  private onExternalTemperatureChange(currentTemperature: number): void {
    this.setExternalTemperature(currentTemperature);
    console.debug('DashboardComponent:onExternalTemperatureChange()', currentTemperature);
  }
}

interface DashboardModel {
  externalTemperature: string,
  beerContainers: Array<BeerContainer>,
}

