import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AzureMapsModule } from 'ng-azure-maps';
import { environment } from '../environments/environment';
import { AuthenticationType } from 'azure-maps-control';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AzureMapsModule.forRoot({
      authOptions: {
        subscriptionKey: environment.subscriptionKey
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
