import { Injectable, Inject } from '@angular/core';
import { AZUREMAPS_CONFIG, AzureMapsConfiguration } from '../configuration';
import * as atlas from 'azure-maps-rest';
import { AuthenticationType } from 'azure-maps-control';

@Injectable()
export class PipelineProvider {

  constructor(@Inject(AZUREMAPS_CONFIG) private readonly azureMapsConfiguration: AzureMapsConfiguration) {

  }

  public getPipeline(): atlas.Pipeline {
    if (this.azureMapsConfiguration.authOptions.authType === AuthenticationType.subscriptionKey) {
      return atlas.MapsURL.newPipeline(new atlas.SubscriptionKeyCredential(this.azureMapsConfiguration.authOptions.subscriptionKey), {
        retryOptions: this.azureMapsConfiguration.pipelineRetryOptions
      });
    }

    throw new Error("Authentication type not supported");
  }

}
