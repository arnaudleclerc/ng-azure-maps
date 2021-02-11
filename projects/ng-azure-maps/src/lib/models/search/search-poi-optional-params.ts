import { ConnectorSet } from './connector-set';
import { ExtendedPostalCodes } from './extended-postal-codes';

export interface SearchPOIOptionalParams {
  /**
   * List of brand names which could be used to restrict the result to specific brands. Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned.
   */
  brandSet?: string[];

  /**
   * Bottom right position of the bounding box. E.g. 37.553,-122.453
   */
  btmRight?: string;

  /**
   * List of category set IDs which could be used to restrict the result to specific Points of Interest categories. ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   */
  categorySet?: number[];

  /**
   * List of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types. Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   */
  connectorSet?: ConnectorSet[];

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
   * Hours of operation for a POI (Points of Interest). The availability of hours of operation will vary based on the data available. Supported value: nextSevenDays
   */
  openingHours?: 'nextSevenDays';

  /**
   * The radius in meters to for the results to be constrained to the defined area
   */
  radius?: number;

  /**
   * Top left position of the bounding box. E.g. 37.553,-122.453
   */
  topLeft?: string;

  /**
   * If the typeahead flag is set, the query will be interpreted as a partial input and the search will enter predictive mode
   */
  typeahead?: boolean;

  /**
   * The View parameter specifies which set of geopolitically disputed content is returned via Azure Maps services, including borders and labels displayed on the map. The View parameter (also referred to as “user region parameter”) will show the correct maps for that country/region. By default, the View parameter is set to “Unified” even if you haven’t defined it in the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that you are authorized to access via Azure Maps is made available. Example: view=IN.
   */
  view?: string;
}

export const searchPOIOptionalParamsToQueryString = (options?: SearchPOIOptionalParams): string => {
  if (!options) {
    return '';
  }

  const queryParameters = [];

  if (options.brandSet) {
    queryParameters.push(`brandSet=${options.brandSet.join(',')}`);
  }

  if (options.btmRight) {
    queryParameters.push(`btmRight=${options.btmRight}`);
  }

  if (options.categorySet) {
    queryParameters.push(`categorySet=${options.categorySet.join(',')}`);
  }

  if (options.connectorSet) {
    queryParameters.push(`connectorSet=${options.connectorSet.map(cs => cs.toString()).join(',')}`);
  }

  if (options.countrySet) {
    queryParameters.push(`countrySet=${options.countrySet.join(',')}`);
  }

  if (options.extendedPostalCodesFor) {
    queryParameters.push(`extendedPostalCodesFor=${options.extendedPostalCodesFor.map(epc => epc.toString()).join(',')}`);
  }

  if (options.language) {
    queryParameters.push(`language=${options.language}`);
  }

  if (options.lat) {
    queryParameters.push(`lat=${options.lat}`);
  }

  if (options.limit) {
    queryParameters.push(`limit=${options.limit}`);
  }

  if (options.lon) {
    queryParameters.push(`lon=${options.lon}`);
  }

  if (options.ofs) {
    queryParameters.push(`ofs=${options.ofs}`);
  }

  if (options.openingHours) {
    queryParameters.push(`openingHours=${options.openingHours}`);
  }

  if (options.radius) {
    queryParameters.push(`radius=${options.radius}`);
  }

  if (options.topLeft) {
    queryParameters.push(`topLeft=${options.topLeft}`);
  }

  if (options.typeahead) {
    queryParameters.push(`typeahead=${options.typeahead}`);
  }

  if (options.view) {
    queryParameters.push(`view=${options.view}`);
  }

  return queryParameters.join('&');
};
