import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CruiseTripComponent } from './cruise-trip/cruise-trip.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CruiseService } from './cruise-trip/cruise-trip.service';

@NgModule({
  declarations: [
    AppComponent,
    CruiseTripComponent
  ],
  imports: [    
    BrowserModule,
    FormsModule ,     
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
    NgxTypeaheadModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [CruiseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
