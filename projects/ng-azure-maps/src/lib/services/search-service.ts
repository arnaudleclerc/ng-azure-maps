import { Injectable } from '@angular/core';
import { PipelineProvider } from './pipeline-provider';
import { SearchURL, Aborter } from 'azure-maps-rest';
import * as atlas from 'azure-maps-rest';
@Injectable()
export class SearchService {

  private readonly _searchUrl: SearchURL;
  private readonly _defaultTimeout = 10000;

  constructor(pipelineProvider: PipelineProvider) {
    this._searchUrl = new SearchURL(pipelineProvider.getPipeline());
  }

  public searchAddress(query: string,
    options?: atlas.Models.SearchGetSearchAddressOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchAddressResponse, atlas.Models.SearchGetSearchAddressResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchAddress(Aborter.timeout(timeout),
        query,
        options);
  }

  public searchAddressReverse(position: GeoJSON.Position,
    options?: atlas.Models.SearchGetSearchAddressReverseOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchAddressReverseResponse, atlas.Models.SearchGetSearchAddressReverseResponse, atlas.SearchReverseGeojson>> {
    return this
      ._searchUrl
      .searchAddressReverse(Aborter.timeout(timeout),
        position,
        options);
  }

  public searchAddressReverseCrossStreet(
    position: GeoJSON.Position,
    options?: atlas.Models.SearchGetSearchAddressReverseCrossStreetOptionalParams,
    timeout: number = this._defaultTimeout
  ): Promise<atlas.Response<atlas.Models.SearchAddressReverseCrossStreetResponse, atlas.Models.SearchGetSearchAddressReverseCrossStreetResponse, atlas.SearchReverseGeojson>> {
    return this
      ._searchUrl
      .searchAddressReverseCrossStreet(Aborter.timeout(timeout),
        position,
        options);
  }

  public searchAddressStructured(
    countryCode: string,
    options?: atlas.Models.SearchGetSearchAddressStructuredOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchAddressStructuredResponse, atlas.Models.SearchGetSearchAddressStructuredResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchAddressStructured(Aborter.timeout(timeout),
        countryCode,
        options);
  }

  public searchAlongRoute(
    query: string,
    maxDetourTime: number,
    body: atlas.Models.SearchAlongRouteRequestBody,
    options?: atlas.Models.SearchPostSearchAlongRouteOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchAlongRouteResponse, atlas.Models.SearchPostSearchAlongRouteResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchAlongRoute(Aborter.timeout(timeout),
        query,
        maxDetourTime,
        body,
        options
      );
  }

  public searchFuzzy(query: string | GeoJSON.Position,
    options?: atlas.Models.SearchGetSearchFuzzyOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchFuzzyResponse, atlas.Models.SearchGetSearchFuzzyResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchFuzzy(Aborter.timeout(timeout),
        query,
        options);
  }

  public searchInsideGeometry(query: string,
    body: atlas.Models.SearchInsideGeometryRequestBody,
    options?: atlas.Models.SearchPostSearchInsideGeometryOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchPostSearchInsideGeometryResponse, atlas.Models.SearchPostSearchInsideGeometryResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchInsideGeometry(Aborter.timeout(timeout),
        query,
        body,
        options);
  }

  public searchNearby(location: GeoJSON.Position,
    options?: atlas.Models.SearchGetSearchNearbyOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchNearbyResponse, atlas.Models.SearchGetSearchNearbyResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchNearby(Aborter.timeout(timeout),
        location,
        options);
  }

  public searchPOI(query: string,
    options?: atlas.Models.SearchGetSearchPOIOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchPoiResponse, atlas.Models.SearchGetSearchPOICategoryResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchPOI(Aborter.timeout(timeout),
        query,
        options);
  }

  public searchPOICategory(query: string,
    options?: atlas.Models.SearchGetSearchPOICategoryOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchPoiCategoryResponse, atlas.Models.SearchGetSearchPOICategoryResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchPOICategory(Aborter.timeout(timeout),
        query,
        options);
  }

  public searchPolygons(geometries: string[],
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchPolygonResponse, atlas.Models.SearchGetSearchPolygonResponse, atlas.SearchPolygonGeojson>> {
    return this
      ._searchUrl
      .searchPolygon(Aborter.timeout(timeout), geometries);
  }

}
