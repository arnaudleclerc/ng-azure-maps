export interface SearchAddressReverseCrossStreetOptionalParams {

  /**
   * The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is North, 90 is East and so on, values range from -360 to 360. The precision can include upto one decimal place
   */
  heading?: number;

  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   */
  language?: string;

  /**
   * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
   */
  limit?: number;

  /**
   * The radius in meters to for the results to be constrained to the defined area
   */
  radius?: number;

  /**
   *
The View parameter specifies which set of geopolitically disputed content is returned via Azure Maps services, including borders and labels displayed on the map. The View parameter (also referred to as “user region parameter”) will show the correct maps for that country/region. By default, the View parameter is set to “Unified” even if you haven’t defined it in the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that you are authorized to access via Azure Maps is made available. Example: view=IN.
   */
  view?: string;

}

export const searchAddressReverseCrossStreetOptionalParamsToQueryString
  = (options?: SearchAddressReverseCrossStreetOptionalParams): string => {

    if (!options) {
      return '';
    }

    const queryParameters = [];

    if (options.heading) {
      queryParameters.push(`heading=${options.heading}`);
    }

    if (options.language) {
      queryParameters.push(`language=${options.language}`);
    }

    if (options.limit) {
      queryParameters.push(`limit=${options.limit}`);
    }

    if (options.radius) {
      queryParameters.push(`radius=${options.radius}`);
    }

    if (options.view) {
      queryParameters.push(`view=${options.view}`);
    }

    return queryParameters.join('&');

  };
