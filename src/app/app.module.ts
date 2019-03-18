import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGaugeModule } from 'ngx-gauge';
import { ToastrModule } from 'ngx-toastr';
import { ExternalTemperatureService } from 'src/app/services/thermometer/external-temperature.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerContainerGaugeComponent } from './components/beer-container-gauge/beer-container-gauge.component';
import { BeerContainerComponent } from './components/beer-container/beer-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BeerContainerGaugeComponent,
    BeerContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-full-width',
      maxOpened: 1,
      countDuplicates: true,
    }),
    NgxGaugeModule,
  ],
  providers: [ExternalTemperatureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
