import { ExtendedPostalCodes } from './extended-postal-codes';

export interface SearchAddressStructuredOptionalParams {
  /**
   * The county for the structured address
   */
  countrySecondarySubdivision?: string;

  /**
   * The country subdivision portion of an address
   */
  countrySubdivision?: string;

  /**
   * The named area for the structured address
   */
  countryTertiarySubdivision: string;

  /**
   * The cross street name for the structured address
   */
  crossStreet?: string;

  /**
   * Indexes for which extended postal codes should be included in the results.
   */
  extendedPostalCodesFor?: ExtendedPostalCodes[];

  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   */
  language?: string;

  /**
   * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
   */
  limit?: number;

  /**
   * The municipality portion of an address
   */
  municipality?: string;

  /**
   * The municipality subdivision (sub/super city) for the structured address
   */
  municipalitySubdivision?: string;

  /**
   * Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and maximum: 1900
   */
  ofs?: number;

  /**
   * The postal code portion of an address
   */
  postalCode?: string;

  /**
   * 	The street name portion of an address
   */
  streetName?: string;

  /**
   * The street number portion of an address
   */
  streetNumber?: string;

  /**
   * The View parameter specifies which set of geopolitically disputed content is returned via Azure Maps services, including borders and labels displayed on the map. The View parameter (also referred to as “user region parameter”) will show the correct maps for that country/region. By default, the View parameter is set to “Unified” even if you haven’t defined it in the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that you are authorized to access via Azure Maps is made available. Example: view=IN.
   */
  view?: string;
}

export const searchAddressStructuredOptionalParamsToQueryString = (options?: SearchAddressStructuredOptionalParams): string => {
  if (!options) {
    return '';
  }

  const queryParameters = [];

  if (options.countrySecondarySubdivision) {
    queryParameters.push(`countrySecondarySubdivision=${options.countrySecondarySubdivision}`);
  }

  if (options.countrySubdivision) {
    queryParameters.push(`countrySubdivision=${options.countrySubdivision}`);
  }

  if (options.countryTertiarySubdivision) {
    queryParameters.push(`countryTertiarySubdivision=${options.countryTertiarySubdivision}`);
  }

  if (options.crossStreet) {
    queryParameters.push(`crossStreet=${options.crossStreet}`);
  }

  if (options.extendedPostalCodesFor) {
    queryParameters.push(`extendedPostalCodesFor=${options.extendedPostalCodesFor.map(pc => pc.toString()).join(',')}`);
  }

  if (options.language) {
    queryParameters.push(`language=${options.language}`);
  }

  if (options.limit) {
    queryParameters.push(`limit=${options.limit}`);
  }

  if (options.municipality) {
    queryParameters.push(`municipality=${options.municipality}`);
  }

  if (options.municipalitySubdivision) {
    queryParameters.push(`municipalitySubdivision=${options.municipalitySubdivision}`);
  }

  if (options.ofs) {
    queryParameters.push(`ofs=${options.ofs}`);
  }

  if (options.postalCode) {
    queryParameters.push(`postalCode=${options.postalCode}`);
  }

  if (options.streetName) {
    queryParameters.push(`streetName=${options.streetName}`);
  }

  if (options.streetNumber) {
    queryParameters.push(`streetNumber=${options.streetNumber}`);
  }

  if (options.view) {
    queryParameters.push(`view=${options.view}`);
  }

  return queryParameters.join('&');
};
