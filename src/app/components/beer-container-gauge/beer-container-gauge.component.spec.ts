import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerContainerGaugeComponent } from './beer-container-gauge.component';

describe('BeerContainerGaugeComponent', () => {
  let component: BeerContainerGaugeComponent;
  let fixture: ComponentFixture<BeerContainerGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerContainerGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerContainerGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
