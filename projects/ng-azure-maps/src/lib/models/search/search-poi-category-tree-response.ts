/**
 * This object is returned from a successful POI Category Tree call
 */
export interface SearchPOICategoryTreeResponse {
  /**
   * Categories array
   */
  poiCategories: SearchPOICategoryTreeResult[];
}

/**
 * POI category result
 */
export interface SearchPOICategoryTreeResult {
  /**
   * Array of child category ids
   */
  childCategoryIds: number[];
  /**
   * Unique ID for the category. ID can be used to restrict search results to specific categories through other Search Service APIs, like Get Search POI.
   */
  id: string;
  /**
   * Name of the category
   */
  name: string;
  /**
   * Array of alternative names of the category
   */
  synonyms: string[];
}
