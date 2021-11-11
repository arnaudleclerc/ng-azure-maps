import { Injectable } from '@angular/core';
import { PipelineProvider } from './pipeline-provider';
import * as atlas from 'azure-maps-rest';
import { AzureMapsModule } from '../modules';

@Injectable({
  providedIn: AzureMapsModule
})
export class RouteService {

  private readonly _routeUrl: atlas.RouteURL;
  private readonly _defaultTimeout = 10000;

  constructor(pipelineProvider: PipelineProvider) {
    this._routeUrl = new atlas.RouteURL(pipelineProvider.getPipeline());
  }

  /**
   *
   *
   * Returns  a route between an origin and a destination, passing through waypoints if they are
   *
   * specified. The route will take into account factors such as current traffic and the typical road
   *
   * speeds on the requested day of the week and time of day.
   *
   *
   *
   * Information returned includes the distance, estimated travel time, and a representation of the
   *
   * route geometry. Additional routing information such as optimized waypoint order or turn by turn
   *
   * instructions is also available, depending on the options selected.
   *
   *
   *
   * Routing service provides a set of parameters for a detailed description of vehicle-specific
   *
   * Consumption Model. Please check [Consumption
   *
   * Model](https://docs.microsoft.com/azure/azure-maps/consumption-model) for detailed explanation
   *
   * of the concepts and parameters involved.
   *
   *
   *
   * If `options.postBody` is specified uses the Post Route Directions API: https://docs.microsoft.com/rest/api/maps/route/postroutedirections
   *
   *
   *
   * Otherwise uses the Get Route Directions API: https://docs.microsoft.com/rest/api/maps/route/getroutedirections
   *
   *
   *
   * @param aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param coordinates An array of coordinates through which the route is calculated.
   * Each coordinate is an array of `[longitude, latitude]`. A minimum of two coordinates is required.
   * The first one is the origin and the last is the destination of the route.
   * Optional coordinates in-between act as WayPoints in the route. You can pass up to 150 WayPoints.
   * @param [options]
   * @returns
   * @memberof RouteURL
   */
  public calculateRouteDirections(coordinates: GeoJSON.Position[],
    options?: atlas.CalculateRouteDirectionsOptions,
    timeout: number = this._defaultTimeout):
    Promise<atlas.CalculateRouteDirectionsResponse> {
    return this
      ._routeUrl
      .calculateRouteDirections(atlas.Aborter.timeout(timeout), coordinates, options);
  }

  /**
   *
   *
   * Calculate a set of locations that can be reached from the origin point based
   *
   * on fuel, energy,  or time budget that is specified. A polygon boundary (or Isochrone) is
   *
   * returned in a counterclockwise  orientation as well as the precise polygon center which was the
   *
   * result of the origin point.
   *
   *
   *
   * The returned polygon can be used for further processing such as  [Search Inside
   *
   * Geometry](https://docs.microsoft.com/rest/api/maps/search/getsearchinsidegeometry) to
   *
   * search for POIs within the provided Isochrone.
   *
   *
   *
   * Uses the Get Route Range API: https://docs.microsoft.com/rest/api/maps/route/getrouterange
   *
   *
   *
   * @param aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param center The coordinate from which the range calculation should start.
   * @param [options] The optional parameters
   * @returns
   * @memberof RouteURL
   */
  public calculateRouteMatrix(body: atlas.Models.RouteMatrixRequestBody,
    options?: atlas.Models.RoutePostRouteMatrixPreviewOptionalParams,
    timeout: number = this._defaultTimeout):
    Promise<atlas.CalculateRouteMatrixResponse> {
    return this
      ._routeUrl
      .calculateRouteMatrix(atlas.Aborter.timeout(timeout), body, options);
  }

  /**
   *
   *
   * **Note: This API is currently in preview and may be subject to breaking changes.**
   *
   * Calculates a matrix of route summaries for a set of routes
   *
   * defined by origin and destination locations. For every given origin, this service calculates the
   *
   * cost of routing from that origin to every given destination. The set of origins and the set of
   *
   * destinations can be thought of as the column and row headers of a table and each cell in the
   *
   * table contains the costs of routing from the origin to the destination for that cell. For each
   *
   * route, the travel times and distances are calculated. You can use the computed costs to
   *
   * determine which routes to calculate using the Routing Directions API. If waitForResults
   *
   * parameter in the request is set to false (default value), this API returns a 202 response code
   *
   * along a redirect URL in the Location field of the response header. This URL should be checked
   *
   * periodically until the response data or error information is available.
   *
   *
   *
   * The maximum size of a matrix for this API is 700 (the number of origins  multiplied by the
   *
   * number of destinations). With that constraint in mind,  examples of possible matrix dimensions
   *
   * are: 50x10, 10x10, 28x25. 10x70  (it does not need to be square).
   *
   *
   *
   * Calculating a route matrix is considered a long running operation.
   *
   * A long running operations implies that after the initial request is accepted (HTTP 202)
   *
   * the final result will be polled for until available.
   *
   * Each poll request restarts the aborter's timeout, if one was specified.
   *
   *
   *
   * Uses the Post Route Matrix API: https://docs.microsoft.com/rest/api/maps/route/postroutematrixpreview
   *
   *
   *
   * @param aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   * goto documents of Aborter for more examples about request cancellation.
   * @param body The matrix of origin and destination coordinates to compute the route
   * distance, travel time and other summary for each cell of the matrix based on the input
   * parameters. The minimum and the maximum cell count supported are 1 and 700 respectively. For
   * example, it can be 35 origins and 20 destinations or 25 origins and 25 destinations.
   * @param [options] The optional parameters
   * @returns
   * @memberof RouteURL
   */
  public calculateRouteRange(center: GeoJSON.Position,
    options?: atlas.Models.RouteGetRouteRangeOptionalParams,
    timeout: number = this._defaultTimeout):
    Promise<atlas.Response<atlas.Models.RouteRangeResponse, atlas.Models.RouteGetRouteRangeResponse, atlas.RouteRangeGeojson>> {
    return this
      ._routeUrl
      .calculateRouteRange(atlas.Aborter.timeout(timeout), center, options);
  }

}
