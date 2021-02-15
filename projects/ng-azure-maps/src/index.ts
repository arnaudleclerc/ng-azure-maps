export { AzureMapsConfiguration } from './lib/configuration';
export {
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
} from './lib/directives';
export * from './lib/contracts';
export {
  SearchAddressOptionalParams,
  ExtendedPostalCodes,
  SearchAddressReverseOptionalParams,
  RoadUse,
  SearchAddressReverseCrossStreetOptionalParams,
  SearchAddressStructuredOptionalParams,
  ConnectorSet,
  SearchFuzzyOptionalParams,
  SearchNearbyOptionalParams,
  SearchPOIOptionalParams,
  SearchPOICategoryOptionalParams,
  SearchPOICategoryTreeOptionalParams,
  SearchPOICategoryTreeResponse,
  SearchPOICategoryTreeResult,
  SearchAlongRouteOptionalParams,
  SearchInsideGeometryOptionalParams
} from './lib/models';
export { AzureMapsModule } from './lib/modules';
export { SearchService, RouteService, WeatherService } from './lib/services';
