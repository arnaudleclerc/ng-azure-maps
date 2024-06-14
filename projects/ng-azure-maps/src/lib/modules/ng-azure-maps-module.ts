import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
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
import * as atlas from 'azure-maps-control';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AtlasRestAuthenticationInterceptor } from '../interceptors';

export const setAzureMapsConfiguration = (configuration: AzureMapsConfiguration) => {
  if (!configuration) {
    throw Error('No AzureMapsConfiguration was provided');
  }
  atlas.setAuthenticationOptions(configuration.authOptions);
  if (configuration.domain) {
    atlas.setDomain(configuration.domain);
  }
};

const setAtlasOptions = (configuration: AzureMapsConfiguration) => (): Promise<void> => new Promise<void>(resolve => {
  if (configuration) {
    setAzureMapsConfiguration(configuration);
  }
  resolve();
});

//@dynamic
@NgModule({ declarations: [
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
    ], imports: [], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AzureMapsModule {
  static forRoot(configuration?: AzureMapsConfiguration): ModuleWithProviders<AzureMapsModule> {
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
    setAzureMapsConfiguration(configuration);
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
