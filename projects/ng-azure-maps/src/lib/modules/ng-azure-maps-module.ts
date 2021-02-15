import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { AzureMapsConfiguration, AZUREMAPS_CONFIG } from '../configuration';
import {
  AzureMapDirective,
  ZoomControlDirective,
  PitchControlDirective,
  CompassControlDirective,
  StyleControlDirective,
  ScaleBarControlDirective,
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
import * as atlas from 'azure-maps-control';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AtlasRestAuthenticationInterceptor } from '../interceptors';

const setAtlasConfiguration = (configuration: AzureMapsConfiguration) => {
  atlas.setAuthenticationOptions(configuration.authOptions);
  if (configuration.domain) {
    atlas.setDomain(configuration.domain);
  }
};

export const setAtlasOptions = (configuration: AzureMapsConfiguration) => (): Promise<void> => new Promise<void>(resolve => {
  setAtlasConfiguration(configuration);
  resolve();
});

//@dynamic
@NgModule({
  declarations: [
    AzureMapDirective,
    ZoomControlDirective,
    PitchControlDirective,
    CompassControlDirective,
    StyleControlDirective,
    ScaleBarControlDirective,
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
    ScaleBarControlDirective,
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
        }
      ]
    };
  }

  static forChild(configuration: AzureMapsConfiguration): ModuleWithProviders<AzureMapsModule> {
    setAtlasConfiguration(configuration);
    return {
      ngModule: AzureMapsModule,
      providers: [
        {
          provide: AZUREMAPS_CONFIG,
          useValue: configuration
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AtlasRestAuthenticationInterceptor,
          multi: true
        }
      ]
    };
  }
}
