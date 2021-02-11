import * as atlas from 'azure-maps-control';
import { ExtendedPostalCodes } from './extended-postal-codes';

export interface SearchAddressOptionalParams {
  /**
   * Bottom right position of the bounding box. E.g. 37.553,-122.453
   */
  btmRight?: atlas.data.Position;
  /**
   * Country codes
   */
  countrySet?: string[];
  /**
   * Indexes for which extended postal codes should be included in the results.
   */
  extendedPostalCodesFor?: ExtendedPostalCodes[];
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   */
  language?: string;
  /**
   * Latitude where results should be biased. E.g. 37.337
   */
  lat?: number;
  /**
   * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
   */
  limit?: number;
  /**
   * Longitude where results should be biased. E.g. -121.89
   */
  lon?: number;
  /**
   * Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900
   */
  ofs?: number;
  /**
   * The radius in meters to for the results to be constrained to the defined area
   */
  radius?: number;
  /**
   * Top left position of the bounding box. E.g. 37.553,-122.453
   */
  topLeft?: atlas.data.Position;
  /**
   * If the typeahead flag is set, the query will be interpreted as a partial input and the search will enter predictive mode
   */
  typeahead?: boolean;
  /**
   * The View parameter specifies which set of geopolitically disputed content is returned via Azure Maps services, including borders and labels displayed on the map. The View parameter (also referred to as “user region parameter”) will show the correct maps for that country/region. By default, the View parameter is set to “Unified” even if you haven’t defined it in the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that you are authorized to access via Azure Maps is made available. Example: view=IN.
   */
  view?: string;
}

export function searchAddressOptionalParamsToQueryString(params?: SearchAddressOptionalParams): string {
  if (!params) {
    return '';
  }

  const queryStringParameters = [];
  if (params.btmRight) {
    queryStringParameters.push(`btmRight=${params.btmRight[0]},${params.btmRight[1]}`);
  }

  if (params.countrySet) {
    queryStringParameters.push(`countrySet=${params.countrySet.join(',')}`);
  }

  if (params.extendedPostalCodesFor) {
    queryStringParameters.push(`extendedPostalCodesFor=${params.extendedPostalCodesFor.map(pc => pc.toString()).join(',')}`);
  }

  if (params.language) {
    queryStringParameters.push(`language=${params.language}`);
  }

  if (params.lat) {
    queryStringParameters.push(`lat=${params.lat}`);
  }

  if (params.limit) {
    queryStringParameters.push(`limit=${params.limit}`);
  }

  if (params.lon) {
    queryStringParameters.push(`lon=${params.lon}`);
  }

  if (params.ofs) {
    queryStringParameters.push(`ofs=${params.ofs}`);
  }

  if (params.radius) {
    queryStringParameters.push(`radius=${params.radius}`);
  }

  if (params.topLeft) {
    queryStringParameters.push(`topLeft=${params.topLeft[0]},${params.topLeft[1]}`);
  }

  if (params.typeahead !== null && params.typeahead !== undefined) {
    queryStringParameters.push(`typeahead=${params.typeahead ? 1 : 0}`);
  }

  if (params.view) {
    queryStringParameters.push(`view=${params.view}`);
  }

  return queryStringParameters.join('&');

}
