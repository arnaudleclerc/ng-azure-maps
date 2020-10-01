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
  TileLayerDirective,
  PopupDirective
} from '../directives';
import {
  PipelineProvider,
  SearchService,
  RouteService,
  WeatherService,
  TokenCredentialProvider
} from '../services';
import * as atlas from 'azure-maps-control';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AtlasRestAuthenticationInterceptor } from '../interceptors';

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
    TileLayerDirective,
    PopupDirective
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
    TileLayerDirective,
    PopupDirective
  ],
  imports: [
    HttpClientModule
  ]
})
export class AzureMapsModule {
  static forRoot(configuration: AzureMapsConfiguration): ModuleWithProviders<AzureMapsModule> {
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
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AtlasRestAuthenticationInterceptor,
          multi: true
        },
        PipelineProvider,
        SearchService,
        RouteService,
        WeatherService,
        TokenCredentialProvider
      ]
    };
  }
}
