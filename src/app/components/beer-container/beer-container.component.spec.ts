import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { BeerContainerGaugeComponent } from '../beer-container-gauge/beer-container-gauge.component';
import { BeerContainerComponent } from './beer-container.component';
import { of } from 'rxjs';

class BeerContainerTemperatureServiceMock {
  getCurrentTemperature() {
    return of(0, 4, 5, 7, 8);
  }
}

describe('BeerContainerComponent', () => {
  let component: BeerContainerComponent;
  let fixture: ComponentFixture<BeerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeerContainerComponent,
        MockComponent(BeerContainerGaugeComponent)
      ]
    })
      .compileComponents();
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

  it('should change panel color when temperature changes', () => {
    component.containerTemperature.subscribe((temperature: number) => {

    });
  });
});
