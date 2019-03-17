import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerContainerGaugeComponent } from './beer-container-gauge.component';
import { Input, Component } from '@angular/core';

@Component({
  selector: 'ngx-gauge',
  template: ''
})
class NgxGaugeComponentFake {
  @Input() size: any;
  @Input() type: any;
  @Input() min: any;
  @Input() max: any;
  @Input() value: any;
  @Input() cap: any;
  @Input() thick: any;
  @Input() label: any;
  @Input() foregroundColor: any;
  @Input() backgroundColor: any;
  @Input() append: any;
  @Input() prepend: any;
  @Input() duration: any;
  @Input() thresholds: any;
  @Input() animate: any;
}

describe('BeerContainerGaugeComponent', () => {
  let component: BeerContainerGaugeComponent;
  let fixture: ComponentFixture<BeerContainerGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [MockComponent(NgxGauge)]
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
