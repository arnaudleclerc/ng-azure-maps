import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AzureMapsModule, setAzureMapsConfiguration } from 'ng-azure-maps';
import { HttpClient } from '@angular/common/http';
import { AuthenticationType } from 'azure-maps-control';

function setAuthentication(httpClient: HttpClient): () => Promise<void> {
  return (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      httpClient.get<{ subscriptionKey: string }>('<your-api-endpoint>').subscribe(auth => {
        setAzureMapsConfiguration({
          authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: auth.subscriptionKey
          }
        });
        resolve();
      }, error => {
        reject(error);
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AzureMapsModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setAuthentication,
      deps: [HttpClient],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
