import { Component, Input, OnInit } from '@angular/core';
import { TemperatureRange } from './../../models/temperature-range.d';

const DEFAULT_GAUGE_SETTINGS: Partial<GaugeSettings> = Object.freeze({
  type: 'arch',
  min: 0,
  max: 12,
  size: 250,
  append: 'ºC',
  foregroundColor: '#009688',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  thick: 7,
  cap: 'round',
}) as Partial<GaugeSettings>;

@Component({
  selector: 'app-beer-container-gauge',
  templateUrl: './beer-container-gauge.component.html',
  styleUrls: ['./beer-container-gauge.component.scss']
})

export class BeerContainerGaugeComponent implements OnInit {
  @Input() temperature: number;
  @Input() containerName: string;
  @Input() temperatureRange: TemperatureRange;
  gaugeSettings: Partial<GaugeSettings>;

  constructor() {
    this.containerName = '';
    this.temperatureRange = { min: 0, max: 0 };
    this.gaugeSettings = Object.assign({}, DEFAULT_GAUGE_SETTINGS);
  }

  ngOnInit() {
    Object.assign(this.gaugeSettings, DEFAULT_GAUGE_SETTINGS, {
      label: `min: ${this.temperatureRange.min}ºC – max: ${this.temperatureRange.max}ºC`,
      thresholds: this.buildThresholdsSettings(this.temperatureRange),
    });
  }

  private buildThresholdsSettings(temperatureRange: TemperatureRange): any {
    const thresholds = {};
    const thresholdsKeys = {
      cool: temperatureRange.min.toString(),
      hot: temperatureRange.max.toString(),
    };
    thresholds[thresholdsKeys.cool] = { color: '#009688' }; // green indicator color
    thresholds[thresholdsKeys.hot] = { color: '#D90000' }; // red indicator color

    return thresholds;
  }
}

interface GaugeSettings {
  size: number;
  type: 'full' | 'semi' | 'arch';
  min: number;
  max: number;
  value: number;
  cap: 'round' | 'butt';
  thick: number;
  label: string;
  foregroundColor: string;
  backgroundColor: string;
  append: string;
  prepend: string;
  duration: number;
  thresholds: any;
  animate: boolean;
}
