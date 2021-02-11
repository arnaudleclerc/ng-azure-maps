import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as atlas from 'azure-maps-control';
import { Observable } from 'rxjs';
import { AzureMapsConfiguration, AZUREMAPS_CONFIG } from '../configuration';
import { TokenCredentialProvider } from '../services';

@Injectable()
export class AtlasRestAuthenticationInterceptor
  implements HttpInterceptor {

  constructor(@Inject(AZUREMAPS_CONFIG) private readonly azureMapsConfiguration: AzureMapsConfiguration,
    private readonly tokenCredentialProvider: TokenCredentialProvider) {

  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.startsWith('https://atlas.microsoft.com')) {
      if (this.azureMapsConfiguration.authOptions.authType === atlas.AuthenticationType.subscriptionKey) {
        const skClone = req.clone({
          url: req.urlWithParams + `&subscription-key=${this.azureMapsConfiguration.authOptions.subscriptionKey}`
        });

        return next.handle(skClone);
      }

      if (this.azureMapsConfiguration.authOptions.authType === atlas.AuthenticationType.aad) {
        const aadClone = req.clone({
          setHeaders: {
            'x-ms-client-id': this.azureMapsConfiguration.authOptions.clientId,
            authorization: `Bearer ${this.tokenCredentialProvider.getAtlasToken()}`
          }
        });

        return next.handle(aadClone);
      }
    }

    return next.handle(req);

  }

}
