import { InjectionToken } from '@angular/core';
import { AuthenticationOptions } from 'azure-maps-control';
import { IRetryOptions } from 'azure-maps-rest';

export const AZUREMAPS_CONFIG = new InjectionToken('AZUREMAPS_CONFIG');

/**
 * Configuration of the Azure Maps
 */
export class AzureMapsConfiguration {
  authOptions: AuthenticationOptions;
  pipelineRetryOptions?: IRetryOptions;
  domain?: string;
}
