/**
 * Using the AAD Authentication, the azure-maps-controls library seems to be based on ADAL. This will break if the switch to MSAL is done.
 */
const atlasAccessTokenStorageKey = 'adal.access.token.keyhttps://atlas.microsoft.com/';

export const getAtlasToken = (): string => localStorage.getItem(atlasAccessTokenStorageKey);
