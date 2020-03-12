import { NgModule, ModuleWithProviders } from "@angular/core";
import { AzureMapsConfiguration, AZUREMAPS_CONFIG } from '../configuration';
import { AzureMapDirective, ZoomControlDirective, PitchControlDirective } from '../directives';

@NgModule({
  declarations: [
    AzureMapDirective,
    ZoomControlDirective,
    PitchControlDirective
  ],
  exports: [
    AzureMapDirective,
    ZoomControlDirective,
    PitchControlDirective
  ]
})
export class AzureMapsModule {
  static forRoot(configuration: AzureMapsConfiguration): ModuleWithProviders {
    return {
      ngModule: AzureMapsModule,
      providers: [
        {
          provide: AZUREMAPS_CONFIG,
          useValue: configuration
        }
      ]
    };
  }
}
