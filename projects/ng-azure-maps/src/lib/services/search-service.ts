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

  /**
   * **Address Geocoding** In many cases, the complete search service might be too much, for
   * instance if you are only interested in traditional geocoding.
   * Search can also be accessed for address look up exclusively.
   * The geocoding is performed by hitting the geocode endpoint with just the address or
   * partial address in question.
   * The geocoding search index will be queried for everything above the street level data.
   * No POIs will be returned.
   * Note that the geocoder is very tolerant of typos and incomplete addresses.
   * It will also handle everything from exact street addresses or street or intersections
   * as well as higher level geographies such as city centers, counties, states etc.
   * Uses the Get Search Address API: https://docs.microsoft.com/rest/api/maps/search/getsearchaddress
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {string} query The address to search for (e.g., "1 Microsoft way, Redmond, WA").
   * @param {SearchAddressOptions} [options] The optional parameters
   * @returns {Promise<SearchAddressResponse>}
   * @memberof SearchURL
   */
  public searchAddress(query: string,
    options?: atlas.Models.SearchGetSearchAddressOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchAddressResponse, atlas.Models.SearchGetSearchAddressResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchAddress(Aborter.timeout(timeout),
        query,
        options);
  }

  /**
   * **Reverse Geocode to an Address** There may be times when you need to translate a
   * coordinate (example: -122.3862, 37.786505) into a human understandable street address.
   * Most often this is needed in tracking applications where you receive a GPS feed from the device or
   * asset and wish to know what address where the coordinate is located.
   * This endpoint will return address information for a given coordinate.
   * Uses the Get Search Address Reverse API: https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {GeoJSON.Position} position The position to reverse search,
   * a coordinate array of `[longitude, latitude]` e.g. `[-122.125679, 47.641268]`.
   * @param {SearchAddressReverseOptions} [options] The optional parameters
   * @returns {Promise<SearchFuzzyResponse>}
   * @memberof SearchURL
   */
  public searchAddressReverse(position: GeoJSON.Position,
    options?: atlas.Models.SearchGetSearchAddressReverseOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchAddressReverseResponse, atlas.Models.SearchGetSearchAddressReverseResponse, atlas.SearchReverseGeojson>> {
    return this
      ._searchUrl
      .searchAddressReverse(Aborter.timeout(timeout),
        position,
        options);
  }

  /**
   * **Reverse Geocode to a Cross Street** There may be times when you need to translate a
   * coordinate (example: -122.3862, 37.786505) into a human understandable cross street.
   * Most often this is needed in tracking applications where you receive a GPS feed from the device or asset
   * and wish to know what address where the coordinate is located.
   * This endpoint will return cross street information for a given coordinate.
   * Uses the Get Search Address Reverse Cross Street API: https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreversecrossstreet
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {GeoJSON.Position} position The position to reverse search,
   * a coordinate array of `[longitude, latitude]` e.g. `[-122.125679, 47.641268]`.
   * @param {SearchAddressReverseCrossStreetOptions} [options] The optional parameters
   * @returns {Promise<SearchAddressReverseCrossStreetResponse>}
   * @memberof SearchURL
   */
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

  /**
   * **Structured Address Geocoding** Azure Address Geocoding can also be accessed for
   * structured address look up exclusively.
   * The geocoding search index will be queried for everything above the street level data.
   * No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses.
   * It will also handle everything from exact street addresses or street or intersections as well as
   * higher level geographies such as city centers, counties, states etc.
   * Uses the Get Search Address Structured API: https://docs.microsoft.com/rest/api/maps/search/getsearchaddressstructured
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {string} countryCode The 2 or 3 letter
   * [ISO3166-1](https://www.iso.org/iso-3166-country-codes.html) country code portion of an address.
   * E.g. US.
   * @param {SearchAddressStructuredOptions} [options] The optional parameters
   * @returns {Promise<SearchAddressStructuredResponse>}
   * @memberof SearchURL
   */
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

  /**
   * The Search Along Route endpoint allows you to perform a fuzzy search for POIs along a specified
   * route.
   * This search is constrained by specifying the `maxDetourTime` limiting measure.
   * To send the route-points you will use a `body` which will contain the `route` object represented
   * as a `GeoJSON LineString` type and the `Content-Type` header will be set to `application/json`.
   * Each route-point in `route` is represented as a `GeoJSON Position` type i.e. an array where the
   * _longitude_ value is followed by the _latitude_ value and the _altitude_ value is ignored.
   * The `route` should contain at least 2 route-points.
   * It is possible that original route will be altered, some of it's points may be skipped.
   * If the route that passes through the found point is faster than the original one, the `detourTime` value in
   * the response is negative.
   * Uses the Post Search Along Route API: https://docs.microsoft.com/rest/api/maps/search/postsearchalongroute
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {string | number[]} query The applicable query string (e.g., "seattle", "pizza").
   * @param {number} maxDetourTime Maximum detour time of the point of interest in seconds. Max value is 3600
   * seconds
   * @param {SearchAlongRouteRequestBody} body This represents the route to search along and should be a
   * valid `GeoJSON LineString` type. Please refer to [RFC
   * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.4) for details.
   * @param {SearchAlongRouteOptions} [options] The optional parameters
   * @returns {Promise<SearchAlongRouteResponse>}
   * @memberof SearchURL
   */
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

  /**
   * **Free Form Search** The basic default API is Free Form Search which handles the most
   * fuzzy of inputs handling any combination of address or POI tokens.
   * This search API is the canonical 'single line search'.
   * The Free Form Search API is a seamless combination of POI search and geocoding.
   * The API can also be weighted with a contextual position (lat./lon. pair), or
   * fully constrained by a coordinate and radius, or it can be executed more generally without any
   * geo biasing anchor point.
   * We strongly advise you to use the 'countrySet' parameter to specify only the countries for
   * which your application needs coverage, as the default behavior will be to search the entire world,
   * potentially returning unnecessary results. E.g.: `countrySet`=US,FR. Please see [Search Coverage]
   * (https://docs.microsoft.com/azure/location-based-services/geocoding-coverage) for
   * a complete list of all the supported countries.
   * Most Search queries default to `maxFuzzyLevel`=2 to gain performance and also reduce unusual results.
   * This new default can be overridden as needed per request by passing in the query param `maxFuzzyLevel`=3 or 4.
   * Uses the Get Search Fuzzy API: https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {string | GeoJSON.Position} query The applicable query string (e.g., "seattle", "pizza").
   * Can _also_ be specified as a coordinate array of `[longitude, latitude]` (e.g., `[-122.125679, 47.641268]`).
   * @param {SearchFuzzyOptions} [options] The optional parameters
   * @returns {Promise<SearchFuzzyResponse>}
   * @memberof SearchURL
   */
  public searchFuzzy(query: string | GeoJSON.Position,
    options?: atlas.Models.SearchGetSearchFuzzyOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchFuzzyResponse, atlas.Models.SearchGetSearchFuzzyResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchFuzzy(Aborter.timeout(timeout),
        query,
        options);
  }

  /**
   * The Search Geometry endpoint allows you to perform a free form search inside a single geometry
   * or many of them.
   * The search results that fall inside the geometry/geometries will be returned.
   * The geographical features to be searched can be modeled as Polygon and/or Circle geometries
   * represented using any one of the following `GeoJSON` types: **GeoJSON FeatureCollection**,
   * The `geometry` can be represented as a `GeoJSON FeatureCollection` object.
   * This is the recommended option if the geometry contains both Polygons and Circles.
   * The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects.
   * Each `Feature` object should represent either a Polygon or a Circle with the following conditions:
   * A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.
   * A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value
   * (in meters) which must be specified in the object's properties along with the _subType_ property
   * whose value should be 'Circle'.
   * Please see the Examples section below for a sample `FeatureCollection` representation.
   * **GeoJSON GeometryCollection**, The `geometry` can be represented as a `GeoJSON GeometryCollection` object.
   * This is the recommended option if the geometry contains a list of Polygons only.
   * The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects.
   * Each `Polygon` object can have a max of 50 coordinates.
   * Please see the Examples section below for a sample `GeometryCollection` representation.
   * **GeoJSON Polygon**, The `geometry` can be represented as a `GeoJSON Polygon` object.
   * This is the recommended option if the geometry contains a single Polygon.
   * The `Polygon` object can have a max of 50 coordinates.
   * Uses the Post Search Inside Geometry API: https://docs.microsoft.com/rest/api/maps/search/postsearchinsidegeometry
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {string | number[]} query The applicable query string (e.g., "seattle", "pizza").
   * @param {SearchInsideGeometryRequestBody} body This represents the geometry for one or more geographical
   * features (parks, state boundary etc.) to search in and should be a GeoJSON compliant type.
   * Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946) for details.
   * @param {SearchInsideGeometryOptions} [options] The optional parameters
   * @returns {Promise<SearchInsideGeometryResponse>}
   * @memberof SearchURL
   */
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

  /**
   * **Nearby Search** If you have a use case for only retrieving POI results around a
   * specific location, the nearby search method may be the right choice.
   * This endpoint will only return POI results, and does not take in a search query parameter.
   * Uses the Get Search Nearby API: https://docs.microsoft.com/rest/api/maps/search/getsearchnearby
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {GeoJSON.Position} location Location where results should be biased.
   * Should be an array of `[longitude, latitude]`, E.g. `[-121.89, 37.337]`.
   * @param {SearchNearbyOptions} [options] The optional parameters
   * @returns {Promise<SearchNearbyResponse>}
   * @memberof SearchURL
   */
  public searchNearby(location: GeoJSON.Position,
    options?: atlas.Models.SearchGetSearchNearbyOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchNearbyResponse, atlas.Models.SearchGetSearchNearbyResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchNearby(Aborter.timeout(timeout),
        location,
        options);
  }

  /**
   * **Get POI by Name** If your search use case only requires POI results, you may use the
   * POI endpoint for searching.
   * This endpoint will only return POI results.
   * Uses the Get Search POI API: https://docs.microsoft.com/rest/api/maps/search/getsearchpoi
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {string} query The POI name to search for (e.g., "statue of liberty", "starbucks").
   * @param {SearchPOIOptions} [options] The optional parameters
   * @returns {Promise<SearchPOIResponse>}
   * @memberof SearchURL
   */
  public searchPOI(query: string,
    options?: atlas.Models.SearchGetSearchPOIOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchPoiResponse, atlas.Models.SearchGetSearchPOICategoryResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchPOI(Aborter.timeout(timeout),
        query,
        options);
  }

  /**
   * **Get POI by Category** If your search use case only requires POI results filtered by
   * category, you may use the category endpoint.
   * This endpoint will only return POI results which are categorized as specified.
   * List of available categories can be found [here](https://docs.microsoft.com/azure/azure-maps/search-categories).
   * Uses the Get Search POI Category API: https://docs.microsoft.com/rest/api/maps/search/getsearchpoicategory
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {string} query The POI category to search for (e.g., "AIRPORT", "BEACH").
   * @param {SearchPOICategoryOptions} [options] The optional parameters
   * @returns {Promise<SearchPOICategoryResponse>}
   * @memberof SearchURL
   */
  public searchPOICategory(query: string,
    options?: atlas.Models.SearchGetSearchPOICategoryOptionalParams,
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchPoiCategoryResponse, atlas.Models.SearchGetSearchPOICategoryResponse, atlas.SearchGeojson>> {
    return this
      ._searchUrl
      .searchPOICategory(Aborter.timeout(timeout),
        query,
        options);
  }

  /**
   * The Search Polygon API allows you to request the geometry data such as a city or country
   * outline for a set of entities, previously retrieved from an Online Search request in GeoJSON
   * format. The geometry  ID is returned in the dataSources object under "geometry" and "id" in
   * either a Search Address or Search Fuzzy call.
   *
   * Please note that any geometry ID retrieved from an Online Search endpoint has a limited
   * lifetime. The client  should not store geometry IDs in persistent storage for later referral, as
   * the stability of these identifiers is  not guaranteed for a long period of time. It is expected
   * that a request to the Polygon method is made within a  few minutes of the request to the Online
   * Search method that provided the ID. The service allows for batch  requests up to 20 identifiers.
   *
   * Uses the Get Search Polygon API: https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param {string} geometries Comma separated list of geometry UUIDs, previously retrieved from an Online
   * Search request.
   * @returns {Promise<SearchPolygonResponse>}
   * @memberof SearchURL
   */
  public searchPolygons(geometries: string[],
    timeout: number = this._defaultTimeout): Promise<atlas.Response<atlas.Models.SearchPolygonResponse, atlas.Models.SearchGetSearchPolygonResponse, atlas.SearchPolygonGeojson>> {
    return this
      ._searchUrl
      .searchPolygon(Aborter.timeout(timeout), geometries);
  }

}
