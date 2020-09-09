export type Unit = 'imperial' | 'metric';

export interface CurrentConditionsResponse {
  results: CurrentConditions[];
}

interface CurrentConditions {
  /**
   * Perceived outdoor WeatherUnit caused by the combination of air WeatherUnit, relative humidity, and wind speed in specified unit.
   */
  apparentWeatherUnit: WeatherUnit;
  /**
   * Cloud ceiling in specified unit. The ceiling is a measurement of the height of the base of the lowest clouds.
   */
  ceiling: WeatherUnit;
  /**
   * Percent representing cloud cover.
   */
  cloudCover: number;
  /**
   * Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
   */
  dateTime: string;
  /**
   * The dewpoint temperature in specified unit. The dewpoint temperature is the temperature that the air must be cooled to in order to reach saturation.
   */
  dewPoint: WeatherUnit;
  /**
   * Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation.
   */
  hasPrecipitation: boolean;
  /**
   * Numeric value representing an image that displays the iconPhrase. Please refer to Weather Service Concepts for details.
   */
  iconCode: number;
  /**
   * Indicates the time of the day. True indicates 'day',', false indicates 'night.
   */
  isDayTime: boolean;
  /**
   * Cause of limited visibility.
   */
  obstructionsToVisibility: string;
  /**
   * Departure from the temperature observed 24 hours ago in specified unit.
   */
  past24HourWeatherUnitDeparture: WeatherUnit;
  /**
   * Phrase description of the current weather condition. Displayed in specified language.
   */
  phrase: string;
  /**
   * Summary of precipitation amounts over the past 24 hours.
   */
  precipitationSummary: PrecipitationSummary;
  /**
   * Atmospheric pressure in specified unit.
   */
  pressure: WeatherUnit;
  /**
   * Atmospheric pressure change.
   */
  pressureTendency: PressureTendency;
  /**
   * RealFeel™ Temperature being returned.
   */
  realFeelTemperature: WeatherUnit;
  /**
   * RealFeel™ Temperature being returned. Describes what the temperature really feels like in the shade.
   */
  realFeelTemperatureShade: WeatherUnit;
  /**
   * Relative humidity is the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature.
   */
  relativeHumidity: number;
  /**
   * Temperature being returned.
   */
  temperature: WeatherUnit;
  /**
   * Summary of temperature fluctuations over the past 6, 12, and 24 hours.
   */
  temperatureSummary: TemperatureSummary;
  /**
   * Measure of the strength of the ultraviolet radiation from the sun. Supported values are:
    0-2 - Low danger from the sun's UV rays or the average person.
    3-5 - Moderate risk of harm from unprotected sun exposure.
    6-7 - High risk of harm from unprotected sun exposure.
    8-10 - Very high risk of harm from unprotected sun exposure.
    11+ - Extreme risk of harm from unprotected sun exposure.
   */
  uvIndex: number;
  /**
   * Phrase associated with the uvIndex.
   */
  uvIndexPhrase: string;
  /**
   * Visibility in specified unit. A measure of the distance at which an object or light can be clearly discerned.
   */
  visibility: WeatherUnit;
  /**
   * The temperature to which air may be cooled by evaporating water into it at constant pressure until it reaches saturation.
   */
  wetBulbTemperature: WeatherUnit;
  /**
   * Wind details being returned including speed and direction.
   */
  wind: Wind;
  /**
   * Perceived air temperature on exposed skin due to wind.
   */
  windChillTemperature: WeatherUnit;
  /**
   * Wind gust. Wind gust is a sudden, brief increase in speed of the wind.
   */
  windGust: Wind;
}

interface TemperatureSummary {
  /**
   * Summary of temperature fluctuations over the past 6 hours.
   */
  past6Hours: Past6Hours;
  /**
   * Summary of temperature fluctuations over the past 12 hours.
   */
  past12Hours: Past12Hours;
  /**
   * Summary of temperature fluctuations over the past 24 hours.
   */
  past24Hours: Past24Hours;
}

/**
 * Summary of temperature fluctuations over the past 6 hours.
 */
interface Past6Hours {
  /**
   * minimum
   */
  minimum: WeatherUnit;
  /**
   * maximum
   */
  maximum: WeatherUnit;
}

/**
 * Summary of temperature fluctuations over the past 12 hours.
 */
interface Past12Hours {
  /**
   * minimum
   */
  minimum: WeatherUnit;
  /**
   * maximum
   */
  maximum: WeatherUnit;
}

/**
 * Summary of temperature fluctuations over the past 24 hours.
 */
interface Past24Hours {
  /**
   * minimum
   */
  minimum: WeatherUnit;
  /**
   * maximum
   */
  maximum: WeatherUnit;
}

interface PrecipitationSummary {
  /**
   * The amount of precipitation (liquid equivalent) that has fallen in the past hour.
   */
  pastHour: WeatherUnit;
  /**
   * The amount of precipitation (liquid equivalent) that has fallen in the past three hours.
   */
  past3Hours: WeatherUnit;
  /**
   * The amount of precipitation (liquid equivalent) that has fallen in the past six hours. Contains Metric and Imperial Values.
   */
  past6Hours: WeatherUnit;
  /**
   * The amount of precipitation (liquid equivalent) that has fallen in the past nine hours.
   */
  past9Hours: WeatherUnit;
  /**
   * The amount of precipitation (liquid equivalent) that has fallen in the past 12 hours.
   */
  past12Hours: WeatherUnit;
  /**
   * The amount of precipitation (liquid equivalent) that has fallen in the past 18 hours.
   */
  past18Hours: WeatherUnit;
  /**
   * The amount of precipitation (liquid equivalent) that has fallen in the past 24 hours.
   */
  past24Hours: WeatherUnit;
}

interface PressureTendency {
  /**
   * Description of the pressure tendency in specified language
   */
  localizedDescription: string;
  /**
   * Pressure tendency code regardless of language. One of F=Falling, S=Steady, R=Rising.
   */
  code: string;
}

/**
 * Wind details being returned including speed and direction.
 */
interface Wind {
  /**
   * Wind direction
   */
  direction: WindDirection;
  /**
   * Speed of the wind in specified unit.
   */
  speed: WindSpeed;
}

/**
 * Wind direction
 */
interface WindDirection {
  /**
   * Wind direction in Azimuth degrees, starting at true North and continuing in clockwise direction. North is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270 degrees. Possible values 0-359.
   */
  degrees: number;
  /**
   * Direction abbreviation in the specified language.
   */
  localizedDescription: string;
}

/**
 * Speed of wind in specified unit.
 */
interface WindSpeed {
  /**
   * Rounded value of the speed.
   */
  value: number;
  /**
   * Type of unit for the speed value.
   */
  unit: string;
  /**
   * Numeric ID value associated with the type of unit being displayed. Can be used for unit translation.
   */
  unitType: number;
}

interface WeatherUnit {
  /**
   * Rounded value.
   */
  value: number;
  /**
   * Type of unit for the returned value.
   */
  unit: string;
  /**
   * Numeric ID value associated with the type of unit being displayed. Can be used for unit translation.
   */
  unitType: number;
}
