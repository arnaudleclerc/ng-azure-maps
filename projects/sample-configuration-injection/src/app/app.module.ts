import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AzureMapsModule, AZUREMAPS_CONFIG } from 'ng-azure-maps';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AzureMapsModule.forRoot()
  ],
  providers: [
    {
      provide: AZUREMAPS_CONFIG,
      useValue: {
        authOptions: environment.authOptions
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
