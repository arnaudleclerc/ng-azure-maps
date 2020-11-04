import { HttpClient } from '@angular/common/http';

export abstract class AtlasHttpService {

  private readonly _rootUrl = "https://atlas.microsoft.com";
  private readonly _apiVersion = "1.0";

  constructor(protected readonly httpClient: HttpClient) {

  }

  protected buildUrl(path: string): string {
    return `${this._rootUrl}/${path}?api-version=${this._apiVersion}`;
  }

}
