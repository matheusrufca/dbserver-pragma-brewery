import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { BeerContainerService } from 'src/app/services/beer/beer-container.service';
import { BeerContainerComponent } from '../beer-container/beer-container.component';
import { DashboardComponent } from './dashboard.component';

const FAKE_BEER_CONTAINERS = Object.freeze([{
  id: 1,
  type: "Pilsner",
  min: 4,
  max: 6
}, {
  id: 2,
  type: "IPA",
  min: 5,
  max: 6
}]);

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let beerContainerServiceMock: any;
  let getPresetsSpy: any;

  beforeEach(async(() => {
    beerContainerServiceMock = jasmine.createSpyObj('BeerContainerService', ['getPresets']);
    getPresetsSpy = beerContainerServiceMock.getPresets.and.returnValue(of(FAKE_BEER_CONTAINERS));

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockComponent(BeerContainerComponent)
      ],
      providers: [
        { provide: BeerContainerService, useValue: beerContainerServiceMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have load beer container presets', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const listItems: NodeListOf<Element> = componentElement.querySelectorAll('app-beer-container');

    expect(component.model.beerContainers.length).toEqual(FAKE_BEER_CONTAINERS.length);
    expect(listItems.length).toEqual(FAKE_BEER_CONTAINERS.length);
  });
});
