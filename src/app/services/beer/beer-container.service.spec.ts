
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BeerContainerService } from './beer-container.service';

describe('BeerContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [BeerContainerService]
  }));

  it('should be created', () => {
    const service: BeerContainerService = TestBed.get(BeerContainerService);
    expect(service).toBeTruthy();
  });
});
