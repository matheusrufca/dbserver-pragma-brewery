
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BeerContainerService } from './beer-container.service';

const FAKE_BEER_CONTAINERS = Object.freeze([{
  id: 1,
  type: 'Pilsner',
  min: 4,
  max: 6
}, {
  id: 2,
  type: 'IPA',
  min: 5,
  max: 6
}]);

describe('BeerContainerService', () => {
  let injector: TestBed;
  let service: BeerContainerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BeerContainerService]
    });
    injector = getTestBed();
    service = injector.get(BeerContainerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPresets', () => {
    it('should return an Observable<BeerContainerPreset[]>', () => {
      service.getPresets().subscribe(presets => {
        expect(presets.length).toBe(FAKE_BEER_CONTAINERS.length);
        expect(presets).toEqual(presets);
      });
      const requestTest = httpMock.expectOne('assets/data/beer-ideal-temperatures.json');
      requestTest.flush(FAKE_BEER_CONTAINERS);
    });
  });

});
