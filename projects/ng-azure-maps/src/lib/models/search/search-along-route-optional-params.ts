import { ConnectorSet } from './connector-set';
import { ExtendedPostalCodes } from './extended-postal-codes';

export interface SearchAlongRouteOptionalParams {
  /**
   * List of brand names which could be used to restrict the result to specific brands. Item order does not matter. When multiple brands are provided, only results that belong to (at least) one of the provided list will be returned.
   */
  brandSet?: string[];

  /**
   * List of category set IDs which could be used to restrict the result to specific Points of Interest categories. ID order does not matter. When multiple category identifiers are provided, only POIs that belong to (at least) one of the categories from the provided list will be returned.
   */
  categorySet?: number[];

  /**
   * List of connector types which could be used to restrict the result to Electric Vehicle Station supporting specific connector types. Item order does not matter. When multiple connector types are provided, only results that belong to (at least) one of the provided list will be returned.
   */
  connectorSet?: ConnectorSet[];
  /**
   * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
   */
  limit?: number;

  /**
   * Hours of operation for a POI (Points of Interest). The availability of hours of operation will vary based on the data available. Supported value: nextSevenDays
   */
  openingHours?: "nextSevenDays";

  /**
   * The View parameter specifies which set of geopolitically disputed content is returned via Azure Maps services, including borders and labels displayed on the map. The View parameter (also referred to as “user region parameter”) will show the correct maps for that country/region. By default, the View parameter is set to “Unified” even if you haven’t defined it in the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that you are authorized to access via Azure Maps is made available. Example: view=IN.
   */
  view?: string;
}

export function searchAlongRouteOptionalParamsToQueryString(options?: SearchAlongRouteOptionalParams): string {
  if (!options) {
    return '';
  }

  const queryParameters = [];

  if (options.brandSet) {
    queryParameters.push(`brandSet=${options.brandSet.join(',')}`);
  }

  if (options.categorySet) {
    queryParameters.push(`categorySet=${options.categorySet.join(',')}`);
  }

  if (options.connectorSet) {
    queryParameters.push(`connectorSet=${options.connectorSet.map(cs => cs.toString()).join(',')}`);
  }

  if (options.limit) {
    queryParameters.push(`limit=${options.limit}`);
  }

  if (options.openingHours) {
    queryParameters.push(`openingHours=${options.openingHours}`);
  }

  if (options.view) {
    queryParameters.push(`view=${options.view}`);
  }

  return queryParameters.join('&');
}
