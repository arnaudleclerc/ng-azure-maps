export interface SearchPOICategoryTreeOptionalParams {
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, except NGT and NGT-Latn. Language tag is case insensitive. When data in specified language is not available for a specific field, default language is used (English).
   */
  language?: string;
}

export function searchPOICategoryTreeOptionalParamsToQueryString(options?: SearchPOICategoryTreeOptionalParams): string {
  if (!options && !options.language) {
    return '';
  }

  return `language=${options.language}`;
}
