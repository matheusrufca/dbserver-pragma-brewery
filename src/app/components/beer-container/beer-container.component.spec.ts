import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { TestObservable } from 'jasmine-marbles/src/test-observables';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { BeerContainerTemperatureService } from 'src/app/services/thermometer/beer-container-temperature.service';
import { BeerContainerGaugeComponent } from '../beer-container-gauge/beer-container-gauge.component';
import { BeerContainerComponent } from './beer-container.component';

class BeerContainerTemperatureServiceMock {
  getCurrentTemperature() {
    return of(0, 4, 5, 7, 8);
  }
}

describe('BeerContainerComponent', () => {
  let component: BeerContainerComponent;
  let fixture: ComponentFixture<BeerContainerComponent>;
  let beerContainerTemperatureServiceMock;
  let getCurrentTemperatureSpy;
  let values: TestObservable;

  beforeEach(async(() => {
    beerContainerTemperatureServiceMock = jasmine.createSpyObj('BeerContainerTemperatureService', ['getCurrentTemperature']);
    values = cold('-a-b-c-d-e|', { a: 0, b: 4, c: 5, d: 7, e: 8 }); //  0, 4, 5, 7, 8
    getCurrentTemperatureSpy = beerContainerTemperatureServiceMock.getCurrentTemperature.and.returnValue(values);

    TestBed.configureTestingModule({
      declarations: [
        BeerContainerComponent,
        MockComponent(BeerContainerGaugeComponent)
      ],
      providers: [
        { provide: BeerContainerTemperatureService, useValue: beerContainerTemperatureServiceMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerContainerComponent);
    component = fixture.componentInstance;
    component.presets = {
      id: 1,
      type: 'IPA',
      min: 4,
      max: 7,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('panel background color', () => {
  //   let expectedColor;

  //   it('should change panel color when temperature changes', () => {
  //     getTestScheduler().flush();
  //     fixture.detectChanges();
  //     expectedColor = getExpectedColor(parseFloat(component.model.temperature), component.presets.min, component.presets.max);
  //     expect(component.cardColor).toEqual(expectedColor);
  //     console.log('temp', component.model.temperature, 'current color', component.cardColor, 'expected color', expectedColor);

  //     getTestScheduler().flush();
  //     fixture.detectChanges();
  //     expectedColor = getExpectedColor(parseFloat(component.model.temperature), component.presets.min, component.presets.max);
  //     expect(component.cardColor).toEqual(expectedColor);
  //     console.log('temp', component.model.temperature, 'current color', component.cardColor, 'expected color', expectedColor);

  //     getTestScheduler().flush();
  //     fixture.detectChanges();
  //     expectedColor = getExpectedColor(parseFloat(component.model.temperature), component.presets.min, component.presets.max);
  //     expect(component.cardColor).toEqual(expectedColor);
  //     console.log('temp', component.model.temperature, 'current color', component.cardColor, 'expected color', expectedColor);
  //   });
  // });
});


function getExpectedColor(temperature: number, min: number, max: number): string {
  let expectedColor;
  if (temperature < min) {
    expectedColor = 'bg-info';
  } else if (temperature > max) {
    expectedColor = 'bg-danger';
  } else {
    expectedColor = 'bg-dark';
  }
  return expectedColor;
}
