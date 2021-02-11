import * as atlasrest from 'azure-maps-rest';

export interface SearchAddressReverseOptionalParams {
  /**
   * Format of newlines in the formatted address.
   * If true, the address will contain newlines. If false, newlines will be converted to commas.
   */
  allowFreeformNewline?: boolean;

  /**
   * Specifies the level of filtering performed on geographies. Narrows the search for specified geography entity types, e.g. return only municipality. The resulting response will contain the geography ID as well as the entity type matched. If you provide more than one entity as a comma separated list, endpoint will return the 'smallest entity available'. Returned Geometry ID can be used to get the geometry of that geography via Get Search Polygon API. The following parameters are ignored when entityType is set:
   * heading
   * number
   * returnRoadUse
   * returnSpeedLimit
   * roadUse
   * returnMatchType
   */
  entityType?: atlasrest.Models.EntityType;

  /**
   * The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is North, 90 is East and so on, values range from -360 to 360. The precision can include upto one decimal place
   */
  heading?: number;

  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   */
  language?: string;

  /**
   * If a number is sent in along with the request, the response may include the side of the street (Left/Right) and also an offset position for that number
   */
  number?: number;

  /**
   * The radius in meters to for the results to be constrained to the defined area
   */
  radius?: number;

  /**
   * Include information on the type of match the geocoder achieved in the response.
   */
  returnMatchType?: boolean;

  /**
   * To enable return of the road use array for reverse geocodes at street level
   */
  returnRoadUse?: boolean;

  /**
   * To enable return of the posted speed limit
   */
  returnSpeedLimit?: boolean;

  /**
   * To restrict reverse geocodes to a certain type of road use
   */
  roadUse?: RoadUse[];

  /**
   * The View parameter specifies which set of geopolitically disputed content is returned via Azure Maps services, including borders and labels displayed on the map. The View parameter (also referred to as “user region parameter”) will show the correct maps for that country/region. By default, the View parameter is set to “Unified” even if you haven’t defined it in the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that you are authorized to access via Azure Maps is made available. Example: view=IN.
   */
  view?: string;
}

export enum RoadUse {
  LimitedAccess = 'LimitedAccess',
  Arterial = 'Arterial',
  Terminal = 'Terminal',
  Ramp = 'Ramp',
  Rotary = 'Rotary',
  LocalStreet = 'LocalStreet'
}

export function searchAddressReverseOptionalParamsToQueryString(options: SearchAddressReverseOptionalParams): string {
  if (!options) {
    return '';
  }

  const queryParameters = [];

  if (options.allowFreeformNewline !== null && options.allowFreeformNewline !== undefined) {
    queryParameters.push(`allowFreeformNewline=${options.allowFreeformNewline.toString()}`);
  }

  if (options.entityType) {
    queryParameters.push(`entityType=${options.entityType.toString()}`);
  }

  if (options.heading) {
    queryParameters.push(`heading=${options.heading}`);
  }

  if (options.language) {
    queryParameters.push(`language=${options.language}`);
  }

  if (options.number) {
    queryParameters.push(`number=${options.number}`);
  }

  if (options.radius) {
    queryParameters.push(`radius=${options.radius}`);
  }

  if (options.returnMatchType !== null && options.returnMatchType !== undefined) {
    queryParameters.push(`returnMatchType=${options.returnMatchType.toString()}`);
  }

  if (options.returnRoadUse !== null && options.returnRoadUse !== undefined) {
    queryParameters.push(`returnRoadUse=${options.returnRoadUse.toString()}`);
  }

  if (options.returnSpeedLimit !== null && options.returnSpeedLimit !== undefined) {
    queryParameters.push(`returnSpeedLimit=${options.returnSpeedLimit.toString()}`);
  }

  if (options.roadUse) {
    queryParameters.push(`roadUse=${options.roadUse.join(',')}`);
  }

  return queryParameters.join('&');

}
