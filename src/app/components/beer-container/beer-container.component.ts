import { Component, Input, OnInit, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TemperatureRange } from 'src/app/models/temperature-range';
import { BeerContainerTemperatureService } from 'src/app/services/thermometer/beer-container-temperature.service';
import { BeerContainerPreset } from './../../services/beer/beer-container.service';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
export class BeerContainerComponent implements OnInit, OnChanges {
  readonly model: BeerContainer;
  readonly containerTemperature: Observable<number>;
  cardColor: CARD_COLORS;
  @Input() type: string;
  @Input() presets: BeerContainerPreset;

  constructor(
    private readonly toastr: ToastrService,
    private readonly beerContainerTemperature: BeerContainerTemperatureService
  ) {
    this.cardColor = CARD_COLORS.Default;
    this.model = {
      temperature: '',
      type: '',
      temperatureRange: { min: 0, max: 0 },
      info: {}
    } as BeerContainer;
    this.containerTemperature = this.beerContainerTemperature.getCurrentTemperature();
  }

  ngOnInit() {
    this.containerTemperature.subscribe(this.onTemperatureChange.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    const presets: SimpleChange = changes.presets;
    this.setTemperatureRange(presets.currentValue);
  }

  private setTemperature(temperature: number): void {
    this.model.temperature = temperature.toFixed(1);
  }

  private setTemperatureRange(preset: BeerContainerPreset): void {
    this.model.temperatureRange = { min: preset.min, max: preset.max };
  }

  private onTemperatureChange(temperature: number): void {
    this.setTemperature(temperature);
    this.setCardColor(temperature);
    setTimeout(() => this.notifyOutboundTemperature(temperature), 500); // avoids multiple toastr at same time
  }

  private setCardColor(temperature: number): void {
    let cardColor = CARD_COLORS.Default;
    if (this.isOverTheLimit(temperature)) {
      cardColor = CARD_COLORS.Hot;
    } else if (this.isUnderTheLimit(temperature)) {
      cardColor = CARD_COLORS.Cool;
    }
    this.cardColor = cardColor;
  }

  private notifyOutboundTemperature(temperature: number): void {
    if (this.isBetweenLimit(temperature)) { return; }
    const message: string = `This container reaches ${this.model.temperature}ºC. Do something, dude.`;
    const title: string = this.isOverTheLimit(temperature) ?
      'container is over the temperature limit' : ' container is under the temperature limit';

    this.toastr.warning(message, `${this.type} ${title}`);
  }

  private isOverTheLimit(temperature: number): boolean {
    return temperature > this.model.temperatureRange.max;
  }

  private isUnderTheLimit(temperature: number): boolean {
    return temperature < this.model.temperatureRange.min;
  }

  private isBetweenLimit(temperature: number): boolean {
    return (temperature >= this.model.temperatureRange.min) && (temperature <= this.model.temperatureRange.max)
  }
}



export interface BeerContainer {
  temperature: string;
  type: string;
  temperatureRange: TemperatureRange;
  info: BeerContainerPreset;
}
