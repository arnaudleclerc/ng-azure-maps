import { InjectionToken } from '@angular/core';
import { AuthenticationOptions } from 'azure-maps-control';

export const AZUREMAPS_CONFIG = new InjectionToken("AZUREMAPS_CONFIG");

/**
 * Configuration of the Azure Maps
 */
export class AzureMapsConfiguration {
  authOptions: {
    subscriptionKey: string
  }
};
