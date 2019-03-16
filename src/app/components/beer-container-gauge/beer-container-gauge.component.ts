import { Component, Input, OnInit } from '@angular/core';
import { TemperatureRange } from './../../models/temperature-range.d';

const DEFAULT_GAUGE_SETTINGS: Partial<GaugeSettings> = Object.freeze({
  type: 'arch',
  min: -20,
  max: 80,
  append: 'ºC',
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
    this.gaugeSettings = Object.assign({}, DEFAULT_GAUGE_SETTINGS);
  }

  ngOnInit() {
    Object.assign(this.gaugeSettings, DEFAULT_GAUGE_SETTINGS, {
      label: this.containerName,
      thresholds: this.buildThresholdsSettings(this.temperatureRange),
    });
  }

  private buildThresholdsSettings(temperatureRange: TemperatureRange): any {
    const thresholdsKeys = {
      min: DEFAULT_GAUGE_SETTINGS.min.toFixed(2),
      cool: temperatureRange.min.toFixed(2),
      hot: temperatureRange.min.toFixed(2),
      max: DEFAULT_GAUGE_SETTINGS.max.toFixed(2),
    };
    const thresholds = {};

    thresholds[thresholdsKeys.min] = { color: '#00BFFF' };
    thresholds[thresholdsKeys.cool] = { color: '#00BFFF' };
    thresholds[thresholdsKeys.hot] = { color: '#00BFFF' };
    thresholds[thresholdsKeys.max] = { color: '#00BFFF' };

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


// deepskyblue	#00BFFF	rgb(0,191,255)
// yellow	#FFFF00	rgb(255,255,0)
// lawngreen	#7CFC00	rgb(124,252,0)
// crimson	#DC143C	rgb(220,20,60)

// size       	    Specifies the size of the canvas in which Gauge will be drawn. It is used as width and height both.	No	200	Positive Integer
// type	            Specifies the gauge's type.	No	"full"	"full", "semi", "arch"
// min	            Specifies the minimum numeric value for gauge's scale.	No	0	Any numeric value
// max	            Specified the maximum numeric value for gauge's scale.	No	100	Any numeric value
// value	          Specifies the current value of the Gauge in the range specified by min and max. It is a required attribute.	Yes	undefined	Any numeric value
// cap	            The style of line ending at the gauge's end.	No	"butt"	"round", "butt"
// thick	          Specified the thickness of the gauge's bar.	No	6	Any Positive Integer
// label	          Specifies the text to display below the Gauge's reading.	No	undefined	Any String
// foregroundColor	Specifies the foreground color of the Gauge's scale.	No	rgba(0, 150, 136, 1)	Any color value string
// backgroundColor	Specifies the background color of the Gauge's scale.	No	rgba(0, 0, 0, 0.1)	Any color value string
// append	          Specifies a string appended to the Gauge's reading. For example "%" most commonly used.	No	undefined	Any string
// prepend	        Specifies a string prepended to the Gauge's reading. For example "$" in case of financial data displayed in Gauge.	No	undefined	Any String
// duration	        Specifies the duration (in milliseconds) of the Gauge's animation	No	1500	Positive Integer
// thresholds	      Specifies an object of threshold values at which the gauge's color changes. Checkout an example here.	No	none	{}
// animate	        toggles the gauge animation.	No	true	boolean
