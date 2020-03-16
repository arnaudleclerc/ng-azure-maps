import { NgModule, ModuleWithProviders } from "@angular/core";
import { AzureMapsConfiguration, AZUREMAPS_CONFIG } from '../configuration';
import {
  AzureMapDirective,
  ZoomControlDirective,
  PitchControlDirective,
  CompassControlDirective,
  StyleControlDirective,
  HtmlMarkerDirective,
  DrawingToolbarDirective,
  SymbolLayerDirective,
  BubbleLayerDirective,
  LineLayerDirective,
  PolygonLayerDirective
} from '../directives';

@NgModule({
  declarations: [
    AzureMapDirective,
    ZoomControlDirective,
    PitchControlDirective,
    CompassControlDirective,
    StyleControlDirective,
    HtmlMarkerDirective,
    DrawingToolbarDirective,
    SymbolLayerDirective,
    BubbleLayerDirective,
    LineLayerDirective,
    PolygonLayerDirective
  ],
  exports: [
    AzureMapDirective,
    ZoomControlDirective,
    PitchControlDirective,
    CompassControlDirective,
    StyleControlDirective,
    HtmlMarkerDirective,
    DrawingToolbarDirective,
    SymbolLayerDirective,
    BubbleLayerDirective,
    LineLayerDirective,
    PolygonLayerDirective
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
