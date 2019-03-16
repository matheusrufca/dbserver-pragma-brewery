import { Component, Input, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { BeerContainerTemperatureService } from 'src/app/services/thermometer/beer-container-temperature.service';
import { BeerContainerPreset } from './../../services/beer/beer-container.service';
import { TemperatureRange } from 'src/app/models/temperature-range';

@Component({
  selector: 'app-beer-container',
  templateUrl: './beer-container.component.html',
  styleUrls: ['./beer-container.component.scss'],
  providers: [BeerContainerTemperatureService]
})
export class BeerContainerComponent implements OnInit {
  readonly model: BeerContainer;
  readonly containerTemperature: Observable<number>;
  @Input() presets: BeerContainerPreset;

  constructor(private readonly beerContainerTemperature: BeerContainerTemperatureService) {
    this.model = {} as BeerContainer;
    this.containerTemperature = this.beerContainerTemperature.getCurrentTemperature();
  }

  ngOnInit() {
    this.containerTemperature.subscribe(this.onTemperatureChange.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    const presets: SimpleChange = changes.presets;
    this.setInfo(presets.currentValue);
    console.debug('presets', presets.previousValue, presets.currentValue);
  }

  private setTemperature(temperature: number): void {
    this.model.temperature = temperature.toFixed(2);
  }

  private setInfo(preset: BeerContainerPreset): void {
    this.model.info = preset;
    this.model.temperatureRange = { min: preset.min, max: preset.max };
  }

  private onTemperatureChange(currentTemperature: number): void {
    this.setTemperature(currentTemperature);
  }
}

export interface BeerContainer {
  temperature: string;
  type: string;
  temperatureRange: TemperatureRange;
  info: BeerContainerPreset;
}
