import { Component, Input, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { BeerContainerTemperatureService } from 'src/app/services/thermometer/beer-container-temperature.service';
import { BeerContainerPreset } from './../../services/beer/beer-container.service';
import { TemperatureRange } from 'src/app/models/temperature-range';

enum CARD_COLORS {
  Default = 'bg-dark',
  Hot = 'bg-danger',
  Cool = 'bg-info',
}

@Component({
  selector: 'app-beer-container',
  templateUrl: './beer-container.component.html',
  styleUrls: ['./beer-container.component.scss'],
  providers: [BeerContainerTemperatureService]
})
export class BeerContainerComponent implements OnInit {
  readonly model: BeerContainer;
  readonly containerTemperature: Observable<number>;
  cardColor: CARD_COLORS;
  @Input() presets: BeerContainerPreset;

  constructor(private readonly beerContainerTemperature: BeerContainerTemperatureService) {
    this.cardColor = CARD_COLORS.Default;
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

  private onTemperatureChange(temperature: number): void {
    this.setTemperature(temperature);
    this.setCardColor(temperature);
  }

  private setCardColor(temperature: number): void {
    let cardColor = CARD_COLORS.Default;
    if (temperature > this.model.temperatureRange.max) {
      cardColor = CARD_COLORS.Hot;
    } else if (temperature < this.model.temperatureRange.min) {
      cardColor = CARD_COLORS.Cool;
    }
    this.cardColor = cardColor;
  }

  private notifyIssue(currentTemperature: number): void {

  }
}



export interface BeerContainer {
  temperature: string;
  type: string;
  temperatureRange: TemperatureRange;
  info: BeerContainerPreset;
}
