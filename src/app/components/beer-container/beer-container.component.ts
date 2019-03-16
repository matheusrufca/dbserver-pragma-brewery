import { Component, OnInit } from '@angular/core';
import { BeerContainerTemperatureService } from 'src/app/services/termometer/beer-container-temperature.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-beer-container',
  templateUrl: './beer-container.component.html',
  styleUrls: ['./beer-container.component.scss'],
  providers: [BeerContainerTemperatureService]
})
export class BeerContainerComponent implements OnInit {
  readonly model: BeerContainer;
  readonly containerTemperature: Observable<number>;

  constructor(private readonly beerContainerTemperature: BeerContainerTemperatureService) {
    this.model = {} as BeerContainer;
    this.containerTemperature = this.beerContainerTemperature.getCurrentTemperature();
  }

  ngOnInit() {
    this.containerTemperature.subscribe(this.onTemperatureChange.bind(this));
  }

  private setTemperature(temperature: number) {
  this.model.temperature = temperature.toFixed(2);
  }

  private onTemperatureChange(currentTemperature: number): void {
    this.setTemperature(currentTemperature);
    console.debug('DashboardComponent:onExternalTemperatureChange()', currentTemperature);
  }
}

export interface BeerContainer {
  temperature: string;
}
