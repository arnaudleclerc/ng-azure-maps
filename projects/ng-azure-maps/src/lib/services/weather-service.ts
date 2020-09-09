import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentConditionsResponse, Unit } from '../contracts';

@Injectable()
export class WeatherService {

  private readonly _rootUrl = "https://atlas.microsoft.com";
  private readonly _apiVersion = "1.0";

  constructor(private readonly httpClient: HttpClient) {

  }

  /**
   * Get Current Conditions service returns detailed current weather conditions such as precipitation, temperature and wind for a given coordinate location.
   * Also, observations from the past 6 or 24 hours for a particular location can be retrieved.
   * The basic information returned with the response include details such as observation date and time, brief description of the weather conditions, weather icon, precipitation indicator flags, and temperature.
   * Additional details such as RealFeel™ Temperature and UV index are also returned.
   * @param latitude Latitude
   * @param longitude Longitude
   * @param details Return full details for the current conditions. Available values are
                    - true - Returns full details. By default all details are returned.
                    - false - Returns a truncated version of the current condition data, which includes observation date time, weather phrase, icon code, precipitation indicator flag, and temperature.
   * @param duration Time frame of the returned weather conditions. By default, the most current weather conditions will be returned. Default value is 0. Supported values are:
                    0 - Return the most current weather conditions.
                    6 - Return weather conditions from past 6 hours.
                    24 - Return weather conditions from past 24 hours.
   * @param language Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used. Default value is en-us.
   * @param unit Specifies to return the data in either metric units or imperial units. Default value is metric.
   */
  public getCurrentConditions(latitude: number,
    longitude: number,
    details?: boolean,
    duration?: number,
    language?: string,
    unit?: Unit
  ): Observable<CurrentConditionsResponse> {

    let url = `${this._rootUrl}/weather/currentConditions/json?api-version=${this._apiVersion}&query=${latitude},${longitude}`;

    if (!(details === null || details === undefined)) {
      url += `&details=${details}`;
    }

    if (!(duration === null || duration === undefined)) {
      url += `&duration=${duration}`;
    }

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    if (!(unit === null || unit === undefined)) {
      url += `&unit=${unit};`
    }

    return this.httpClient.get<CurrentConditionsResponse>(url);

  }

}
