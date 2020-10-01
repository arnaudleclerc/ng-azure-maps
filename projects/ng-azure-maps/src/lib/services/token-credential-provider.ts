import { Injectable } from '@angular/core';

@Injectable()
export class TokenCredentialProvider {

  /**
   * Using the AAD Authentication, the azure-maps-controls library seems to be based on ADAL. This will break if the switch to MSAL is done.
   */
  private readonly _atlasAccessTokenStorageKey = "adal.access.token.keyhttps://atlas.microsoft.com/";

  public getAtlasToken(): string {
    return localStorage.getItem(this._atlasAccessTokenStorageKey);
  }

}
