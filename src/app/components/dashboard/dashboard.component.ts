import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BeerContainerService } from 'src/app/services/beer/beer-container.service';
import { BeerContainerPreset } from './../../services/beer/beer-container.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly model: DashboardModel;

  constructor(
    private readonly toastr: ToastrService,
    private readonly beerContainerService: BeerContainerService
  ) {
    this.model = {
      beerContainers: [],
    } as DashboardModel;
  }

  ngOnInit() {
    this.loadBeerContainersPresets();
  }

  private loadBeerContainersPresets(): void {
    this.beerContainerService.getPresets().subscribe(
      this.setBeerContainers.bind(this),
      this.handleLoadingError.bind(this)
    );
  }

  private setBeerContainers(presets: BeerContainerPreset[]): void {
    this.model.beerContainers = presets;
  }

  private handleLoadingError(error: Error): void {
    this.toastr.error(error.message);
  }
}

interface DashboardModel {
  externalTemperature: string,
  beerContainers: BeerContainerPreset[],
}

