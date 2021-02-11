import { Injectable, Inject } from '@angular/core';
import { AZUREMAPS_CONFIG, AzureMapsConfiguration } from '../configuration';
import * as atlas from 'azure-maps-rest';
import { AuthenticationType } from 'azure-maps-control';
import { AzureMapsModule } from '../modules';
import { getAtlasToken } from '../helpers';

@Injectable({
  providedIn: AzureMapsModule
})
export class PipelineProvider {

  constructor(@Inject(AZUREMAPS_CONFIG) private readonly azureMapsConfiguration: AzureMapsConfiguration) {

  }

  public getPipeline(): atlas.Pipeline {
    if (this.azureMapsConfiguration.authOptions.authType === AuthenticationType.subscriptionKey) {
      return atlas.MapsURL.newPipeline(new atlas.SubscriptionKeyCredential(this.azureMapsConfiguration.authOptions.subscriptionKey), {
        retryOptions: this.azureMapsConfiguration.pipelineRetryOptions
      });
    }

    if (this.azureMapsConfiguration.authOptions.authType === AuthenticationType.aad) {
      return atlas.MapsURL.newPipeline(
        new atlas.TokenCredential(this.azureMapsConfiguration.authOptions.clientId, getAtlasToken()),
        {
          retryOptions: this.azureMapsConfiguration.pipelineRetryOptions
        }
      );
    }

    throw new Error('Authentication type not supported');
  }

}
