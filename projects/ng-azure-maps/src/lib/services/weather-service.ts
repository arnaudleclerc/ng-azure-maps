import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentConditionsResponse, DailyForecastResponse, HourlyForecastResponse, MinuteForecastResponse, Unit } from '../contracts';

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
    duration?: 0 | 6 | 24,
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

  /**
   * The service returns detailed weather forecast such as temperature and wind by day for the next 1, 5, 10, 15, 25, or 45 days for a given coordinate location. The response include details such as temperature, wind, precipitation, air quality, and UV index.
   * @param latitude Latitude
   * @param longitude Longitude
   * @param duration Specifies for how many days the daily forecast responses are returned. Available values are
                      1 - Return forecast data for the next day. Returned by default.
                      5 - Return forecast data for the next 5 days.
                      10 - Return forecast data for the next 10 days.
                      25 - Return forecast data for the next 25 days. Only available in S1 SKU.
                      45 - Return forecast data for the next 45 days. Only available in S1 SKU.
   * @param language Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used. Default value is en-us.
   * @param unit Specifies to return the data in either metric units or imperial units. Default value is metric.
   */
  public getDailyForecast(latitude: number,
    longitude: number,
    duration?: 1 | 5 | 10 | 25 | 45,
    language?: string,
    unit?: Unit
  ): Observable<DailyForecastResponse> {
    let url = `${this._rootUrl}/weather/forecast/daily/json?api-version=${this._apiVersion}&query=${latitude},${longitude}`;

    if (!(duration === null || duration === undefined)) {
      url += `&duration=${duration}`;
    }

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    if (!(unit === null || unit === undefined)) {
      url += `&unit=${unit};`
    }

    return this.httpClient.get<DailyForecastResponse>(url);
  }

  /**
   * Request detailed weather forecast by the hour for the next 1, 12, 24 (1 day), 72 (3 days), 120 (5 days), and 240 hours (10 days) for the given the given coordinate location. The API returns details such as temperature, humidity, wind, precipitation, and ultraviolet (UV) index.
   * @param latitude Latitude
   * @param longitude Longitude
   * @param duration Time frame of the returned weather forecast. By default, the forecast data for next hour will be returned. Available values are
                      1 - Return forecast data for the next hour. Default value.
                      12 - Return hourly forecast for next 12 hours.
                      24 - Return hourly forecast for next 24 hours.
                      72 - Return hourly forecast for next 72 hours (3 days).
                      120 - Return hourly forecast for next 120 hours (5 days). Only available in S1 SKU.
                      240 - Return hourly forecast for next 240 hours (10 days). Only available in S1 SKU.
   * @param language Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used. Default value is en-us.
   * @param unit Specifies to return the data in either metric units or imperial units. Default value is metric.
   */
  public getHourlyForecast(latitude: number,
    longitude: number,
    duration?: 1 | 12 | 24 | 72 | 120 | 240,
    language?: string,
    unit?: Unit
  ): Observable<HourlyForecastResponse> {
    let url = `${this._rootUrl}/weather/forecast/hourly/json?api-version=${this._apiVersion}&query=${latitude},${longitude}`;

    if (!(duration === null || duration === undefined)) {
      url += `&duration=${duration}`;
    }

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    if (!(unit === null || unit === undefined)) {
      url += `&unit=${unit};`
    }

    return this.httpClient.get<HourlyForecastResponse>(url);
  }

  /**
   * Get Minute Forecast service returns minute-by-minute forecasts for a given location for the next 120 minutes. Users can request weather forecasts in the interval of 1, 5 and 15 minutes. The response will include details such as the type of precipitation (including rain, snow, or a mixture of both), start time, and precipitation intensity value (dBZ).
   * @param latitude Latitude
   * @param longitude Longitude
   * @param interval Specifies time interval in minutes for the returned weather forecast. Supported values are
                    1 - Retrieve forecast for 1-minute intervals. Returned by default.
                    5 - Retrieve forecasts for 5-minute intervals.
                    15 - Retrieve forecasts for 15-minute intervals.
   * @param language Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used. Default value is en-us.
   */
  public getMinuteForecast(latitude: number,
    longitude: number,
    interval?: 1 | 5 | 15,
    language?: string
  ): Observable<MinuteForecastResponse> {
    let url = `${this._rootUrl}/weather/forecast/minute/json?api-version=${this._apiVersion}&query=${latitude},${longitude}`;

    if (!(interval === null || interval === undefined)) {
      url += `&interval=${interval}`;
    }

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    return this.httpClient.get<MinuteForecastResponse>(url);
  }

}
