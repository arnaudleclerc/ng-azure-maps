import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentConditionsResponse, DailyForecastResponse, HourlyForecastResponse, MinuteForecastResponse, QuarterDayForecastResponse, Unit, WaypointInput, WeatherAlongRouteResponse } from '../contracts';
import { AtlasHttpService } from './atlas-http.service';

@Injectable()
export class WeatherService
  extends AtlasHttpService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Get Current Conditions service returns detailed current weather conditions such as precipitation, temperature and wind for a given coordinate location.
   * Also, observations from the past 6 or 24 hours for a particular location can be retrieved.
   * The basic information returned with the response include details such as observation date and time, brief description of the weather conditions, weather icon, precipitation indicator flags, and temperature.
   * Additional details such as RealFeel™ Temperature and UV index are also returned.
   *
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

    let url = this.buildUrl('weather/currentConditions/json');
    url += `&query=${latitude},${longitude}`;

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
      url += `&unit=${unit};`;
    }

    return this.httpClient.get<CurrentConditionsResponse>(url);

  }

  /**
   * The service returns detailed weather forecast such as temperature and wind by day for the next 1, 5, 10, 15, 25, or 45 days for a given coordinate location. The response include details such as temperature, wind, precipitation, air quality, and UV index.
   *
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

    let url = this.buildUrl('weather/forecast/daily/json');
    url += `&query=${latitude},${longitude}`;

    if (!(duration === null || duration === undefined)) {
      url += `&duration=${duration}`;
    }

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    if (!(unit === null || unit === undefined)) {
      url += `&unit=${unit};`;
    }

    return this.httpClient.get<DailyForecastResponse>(url);
  }

  /**
   * Request detailed weather forecast by the hour for the next 1, 12, 24 (1 day), 72 (3 days), 120 (5 days), and 240 hours (10 days) for the given the given coordinate location. The API returns details such as temperature, humidity, wind, precipitation, and ultraviolet (UV) index.
   *
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

    let url = this.buildUrl('weather/forecast/hourly/json');
    url += `&query=${latitude},${longitude}`;

    if (!(duration === null || duration === undefined)) {
      url += `&duration=${duration}`;
    }

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    if (!(unit === null || unit === undefined)) {
      url += `&unit=${unit};`;
    }

    return this.httpClient.get<HourlyForecastResponse>(url);
  }

  /**
   * Get Minute Forecast service returns minute-by-minute forecasts for a given location for the next 120 minutes. Users can request weather forecasts in the interval of 1, 5 and 15 minutes. The response will include details such as the type of precipitation (including rain, snow, or a mixture of both), start time, and precipitation intensity value (dBZ).
   *
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
    let url = this.buildUrl('weather/forecast/minute/json');
    url += `&query=${latitude},${longitude}`;

    if (!(interval === null || interval === undefined)) {
      url += `&interval=${interval}`;
    }

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    return this.httpClient.get<MinuteForecastResponse>(url);
  }

  /**
   * Service returns detailed weather forecast by quarter-day for the next 1, 5, 10, or 15 days for a given location. Response data is presented by quarters of the day - morning, afternoon, evening, and overnight. Details such as temperature, humidity, wind, precipitation, and UV index are returned.Service returns detailed weather forecast by quarter-day for the next 1, 5, 10, or 15 days for a given location. Response data is presented by quarters of the day - morning, afternoon, evening, and overnight. Details such as temperature, humidity, wind, precipitation, and UV index are returned.
   *
   * @param latitude Latitude
   * @param longitude Longitude
   * @param duration Specifies for how many days the quester-day forecast responses are returned. Supported values are:
                      1 - Return forecast data for the next day. Returned by default.
                      5 - Return forecast data for the next 5 days.
                      10 - Return forecast data for next 10 days.
                      15 - Return forecast data for the next 15 days.
   * @param language Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used. Default value is en-us.
   * @param unit Specifies to return the data in either metric units or imperial units. Default value is metric.
   */
  public getQuarterDayForecast(latitude: number,
    longitude: number,
    duration?: 1 | 5 | 10 | 15,
    language?: string,
    unit?: Unit
  ): Observable<QuarterDayForecastResponse> {
    let url = this.buildUrl('weather/forecast/quarterDay/json');
    url += `&query=${latitude},${longitude}`;

    if (!(duration === null || duration === undefined)) {
      url += `&duration=${duration}`;
    }

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    if (!(unit === null || unit === undefined)) {
      url += `&unit=${unit};`;
    }

    return this.httpClient.get<QuarterDayForecastResponse>(url);
  }

  /**
   * Weather along a route API returns hyper local (one kilometer or less), up-to-the-minute weather nowcasts, weather hazard assessments, and notifications along a route described as a sequence of waypoints. This includes a list of weather hazards affecting the waypoint or route, and the aggregated hazard index for each waypoint might be used to paint each portion of a route according to how safe it is for the driver. When submitting the waypoints, it is recommended to stay within, or close to, the distance that can be traveled within 120-mins or shortly after. Data is updated every five minutes.
    The service supplements Azure Maps Route Service that allows you to first request a route between an origin and a destination and use that as an input for Weather Along Route endpoint.
    In addition, the service supports scenarios to generate weather notifications for waypoints that experience an increase in intensity of a weather hazard. For example, if the vehicle is expected to begin experiencing heavy rain as it reaches a waypoint, a weather notification for heavy rain will be generated for that waypoint allowing the end product to display a heavy rain notification before the driver reaches that waypoint. The trigger for when to display the notification for a waypoint could be based, for example, on a geofence, or selectable distance to the waypoint.
    The API covers all regions of the planet except latitudes above Greenland and Antarctica.
   *
   * @param waypoints Coordinates through which the route is calculated, separated by colon (:) and entered in chronological order. A minimum of two waypoints is required. A single API call may contain up to 60 waypoints. A waypoint indicates location, ETA, and optional heading.
   * @param language Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used. Default value is en-us.
   */
  public getWeatherAlongRoute(waypoints: WaypointInput[],
    language?: string
  ): Observable<WeatherAlongRouteResponse> {
    if (waypoints === null || waypoints === undefined || waypoints.length < 2) {
      throw new Error('A minimum of two waypoints is required');
    }

    if (waypoints.length > 60) {
      throw new Error('A single API call may contain up to 60 waypoints');
    }

    const query = waypoints.map(waypoint => {
      let query = `${waypoint.latitude},${waypoint.longitude},${waypoint.eta}`;
      if (waypoint.heading !== null && waypoint.heading !== undefined) {
        query += `,${waypoint.heading}`;
      }

      return query;
    }).join(':');

    let url = this.buildUrl('weather/route/json');
    url += `&query=${query}`;

    if (!(language === null || language === undefined)) {
      url += `&language=${language}`;
    }

    return this.httpClient.get<WeatherAlongRouteResponse>(url);
  }

}
