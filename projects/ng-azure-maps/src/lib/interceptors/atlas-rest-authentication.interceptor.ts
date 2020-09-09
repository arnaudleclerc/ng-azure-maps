import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as atlas from 'azure-maps-control';
import { Observable } from 'rxjs';
import { AzureMapsConfiguration, AZUREMAPS_CONFIG } from '../configuration';

@Injectable()
export class AtlasRestAuthenticationInterceptor
  implements HttpInterceptor {

  constructor(@Inject(AZUREMAPS_CONFIG) private readonly azureMapsConfiguration: AzureMapsConfiguration) {

  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.startsWith('https://atlas.microsoft.com')
      && this.azureMapsConfiguration.authOptions.authType === atlas.AuthenticationType.subscriptionKey) {
      const clone = req.clone({
        url: req.urlWithParams + `&subscription-key=${this.azureMapsConfiguration.authOptions.subscriptionKey}`
      });

      return next.handle(clone);
    }

    return next.handle(req);

  }

}
