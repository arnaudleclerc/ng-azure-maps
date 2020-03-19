import { Injectable } from '@angular/core';
import { PipelineProvider } from './pipeline-provider';
import { RouteURL } from 'azure-maps-rest';
import * as atlas from 'azure-maps-rest';

@Injectable()
export class RouteService {

  private readonly _routeUrl: RouteURL;
  private readonly _defaultTimeout = 10000;

  constructor(pipelineProvider: PipelineProvider) {
    this._routeUrl = new RouteURL(pipelineProvider.getPipeline());
  }

  public calculateRouteDirections(coordinates: GeoJSON.Position[],
    options?: atlas.CalculateRouteDirectionsOptions,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.RouteDirectionsResponse, atlas.Models.RouteGetRouteDirectionsResponse, atlas.RouteGeojson>> {
    return this
      ._routeUrl
      .calculateRouteDirections(atlas.Aborter.timeout(timeout), coordinates, options);
  }

  public calculateRouteMatrix(body: atlas.Models.RouteMatrixRequestBody,
    options?: atlas.Models.RoutePostRouteMatrixPreviewOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.RouteMatrixResponse, atlas.Models.RoutePostRouteMatrixPreviewResponse, undefined>> {
    return this
      ._routeUrl
      .calculateRouteMatrix(atlas.Aborter.timeout(timeout), body, options);
  }

  public calculateRouteRange(center: GeoJSON.Position,
    options?: atlas.Models.RouteGetRouteRangeOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.RouteRangeResponse, atlas.Models.RouteGetRouteRangeResponse, atlas.RouteRangeGeojson>> {
    return this
      ._routeUrl
      .calculateRouteRange(atlas.Aborter.timeout(timeout), center, options);
  }

}
