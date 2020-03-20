import { NgModule, ModuleWithProviders, APP_INITIALIZER } from "@angular/core";
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
  PolygonLayerDirective,
  PolygonExtrusionLayerDirective,
  HeatmapLayerDirective,
  ImageLayerDirective,
  TileLayerDirective
} from '../directives';
import {
  PipelineProvider,
  SearchService,
  RouteService
} from '../services';
import * as atlas from 'azure-maps-control';

export function setAtlasOptions(configuration: AzureMapsConfiguration) {
  return (): Promise<any> => {
    return new Promise<any>(resolve => {
      atlas.setAuthenticationOptions(configuration.authOptions);
      if (configuration.domain) {
        atlas.setDomain(configuration.domain);
      }
      resolve();
    });
  };
}

//@dynamic
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
    PolygonLayerDirective,
    PolygonExtrusionLayerDirective,
    HeatmapLayerDirective,
    ImageLayerDirective,
    TileLayerDirective
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
    PolygonLayerDirective,
    PolygonExtrusionLayerDirective,
    HeatmapLayerDirective,
    ImageLayerDirective,
    TileLayerDirective
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
        },
        {
          provide: APP_INITIALIZER,
          useFactory: setAtlasOptions,
          deps: [AZUREMAPS_CONFIG],
          multi: true
        },
        PipelineProvider,
        SearchService,
        RouteService
      ]
    };
  }
}
