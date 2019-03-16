import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExternalTemperatureProviderService } from './services/termometer/external-temperature-provider.service';
import { BeerContainerComponent } from './components/beer-container/beer-container.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BeerContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxGaugeModule,
  ],
  providers: [ExternalTemperatureProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// deepskyblue	#00BFFF	rgb(0,191,255)
// yellow	#FFFF00	rgb(255,255,0)
// lawngreen	#7CFC00	rgb(124,252,0)
// crimson	#DC143C	rgb(220,20,60)
