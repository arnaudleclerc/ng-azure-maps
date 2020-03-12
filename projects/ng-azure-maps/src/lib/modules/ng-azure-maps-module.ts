import { NgModule, ModuleWithProviders, APP_INITIALIZER } from "@angular/core";
import { AzureMapsConfiguration, AZUREMAPS_CONFIG } from '../configuration';
import { AzureMapDirective, ZoomControlDirective } from '../directives';

@NgModule({
  declarations: [
    AzureMapDirective,
    ZoomControlDirective
  ],
  exports: [
    AzureMapDirective,
    ZoomControlDirective
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
