export type Unit = 'imperial' | 'metric';

/**
 * Quarter of the day.
 */
export type Quarter = 0 | 1 | 2 | 3;

export interface CurrentConditionsResponse {
  results: CurrentConditions[];
}

export interface CurrentConditions {
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

export interface TemperatureSummary {
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
export interface Past6Hours {
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
export interface Past12Hours {
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
export interface Past24Hours {
  /**
   * minimum
   */
  minimum: WeatherUnit;
  /**
   * maximum
   */
  maximum: WeatherUnit;
}

export interface PrecipitationSummary {
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

export interface PressureTendency {
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
export interface Wind {
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
export interface WindDirection {
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
export interface WindSpeed {
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

export interface WeatherUnit {
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

export interface DailyForecastResponse {
  /**
   * Summary for the main conditions for the requested time period. Notice that summary can cover only part of the time period.
   */
  summary: DailyForecastSummary;
  /**
   * Forecast data for each requested day.
   */
  forecasts: DailyForecast[];
}

export interface DailyForecast {
  /**
   * Date and time of the current observation displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
   */
  date: string;
  /**
   * Temperature values for the day.
   */
  temperature: WeatherUnitRange;
  /**
   * RealFeel™ Temperature being returned.
   */
  realFeelTemperature: WeatherUnitRange;
  /**
   * RealFeel™ Temperature being returned. Describes what the temperature really feels like in the shade.
   */
  realFeelTemperatureShade: WeatherUnitRange;
  /**
   * Hours of sun.
   */
  hoursOfSun: number;
  /**
   * Summary of Heating Degree Day or Cooling Degree Day information
   */
  degreeDaySummary: DegreeDaySummary;
  /**
   * airAndPollen
   */
  airAndPollen: AirAndPollen[];
  /**
   * Day
   */
  day: DayOrNight;
  /**
   * Night
   */
  night: DayOrNight;
  /**
   * Source(s) of the forecast data.
   */
  sources: string[];
}

export interface DayOrNight {
  /**
   * Numeric value representing an image that displays the iconPhrase. Please refer to Weather Service Concepts for details.
   */
  iconCode: number;
  /**
   * Phrase description of the icon. Displayed in specified language. For example, 'Sunny'.
   */
  iconPhrase: string;
  /**
   * Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation.
   */
  hasPrecipitation: boolean;
  /**
   * Specifies the type of precipitation ("rain" "snow" "ice" or "mix"). If dbz = zero, precipitationType is not present in the response.
   */
  precipitationType: string;
  /**
   * Description of the intensity.
   */
  precipitationIntensity: string;
  /**
   * Phrase description of the forecast in specified language. Azure Maps attempts to keep this phrase under 30 characters in length, but some languages/weather events may result in a longer phrase length, exceeding 30 characters.
   */
  shortPhrase: string;
  /**
   * Phrase description of the forecast in specified language. Azure Maps attempts to keep this phrase under 100 characters in length, but some languages/weather events may result in a longer phrase length, exceeding 100 characters.
   */
  longPhrase: string;
  /**
   * Percent representing the probability of precipitation. For example, '20'.
   */
  precipitationProbability: number;
  /**
   * Percent representing the probability of a thunderstorm. For example, '80'.
   */
  thunderstormProbability: number;
  /**
   * Percent representing the probability of rain. For example, '40'.
   */
  rainProbability: number;
  /**
   * Percent representing the probability of snow. For example, '30'.
   */
  snowProbability: number;
  /**
   * Percent representing the probability of ice. For example, '30'.
   */
  iceProbability: number;
  /**
   * Wind details being returned including speed and direction.
   */
  wind: Wind;
  /**
   * Wind gust. Wind gust is a sudden, brief increase in speed of the wind.
   */
  windGust: Wind;
  /**
   * Total liquid equivalent of precipitation during the forecast period.
   */
  totalLiquid: WeatherUnit;
  /**
   * Rain
   */
  rain: WeatherUnit;
  /**
   * Snow
   */
  snow: WeatherUnit;
  /**
   * Ice
   */
  ice: WeatherUnit;
  /**
   * Hours of precipitation
   */
  hoursOfPrecipitation: number;
  /**
   * Hours of rain.
   */
  hoursOfRain: number;
  /**
   * Hours of snow.
   */
  hoursOfSnow: number;
  /**
   * Hours of ice.
   */
  hoursOfIce: number;
  /**
   * Percent representing cloud cover.
   */
  cloudCover: number;
  localSource?: LocalSource;
}

export interface AirAndPollen {
  /**
   * Name of the pollen or pollutant. For example, grass, mold, weed, air quality, tree and UV index.
   */
  name: string;
  /**
   * Value of the given type above. Values associated with mold, grass, weed and tree are in units of parts per cubic meter. Both air quality and UV are indices, so they are unitless.
   */
  value: number;
  /**
   * Category of the air quality or pollution type. For example, low, high, good, moderate, unhealthy, hazardous.
   */
  category: string;
  /**
   * Value associated with the air quality or pollution category. These values range from 1 to 6. 1 implying good conditions, 6 implying hazardous conditions.
   */
  categoryValue: number;
  /**
   * Only exists for air quality. Examples include ozone and particle pollution.
   */
  type?: string;
}

export interface DegreeDaySummary {
  /**
   * Number of degrees that the mean temperature is below 65 degrees F/ 18 degree C.
   */
  heating: WeatherUnit;
  /**
   * Number of degrees that the mean temperature is above 65 degrees F/ 18 degree C.
   */
  cooling: WeatherUnit;
}

/**
 * Returned temperature values.
 */
export interface WeatherUnitRange {
  /**
   * Minimum temperature for the time period.
   */
  minimum: WeatherUnit;
  /**
   * Maximum temperature for the time period
   */
  maximum: WeatherUnit;
}

/**
 * Summary for the main conditions for the requested time period. Notice that summary can cover only part of the time period.
 */
export interface DailyForecastSummary {
  /**
   * Date and time that the summary is in effect, displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
   */
  startDate: string;
  /**
   * Date and time that the summary period ends, displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
   */
  endDate: string;
  /**
   * severity
   */
  severity: number;
  /**
   * Summary phrase of the daily forecast. Displayed in specified language.
   */
  phrase: string;
  /**
   * one or 2 word(s) to summarize the phrase.
   */
  category: string;
}

export interface LocalSource {
  /**
   * Numeric identifier, unique to the local data provider.
   */
  id: number;
  /**
   * Name of the local data provider. Name is displayed in the language specified by language code in URL, if available. Otherwise, Name is displayed in English or the language in which the name was provided.
   */
  name: string;
  /**
   * Weather code provided by the local data provider. This weather code allows the forecast to be matched to icons provided by the local data provider instead of Azure Maps icons.
   */
  weatherCode: string;
}

export interface HourlyForecastResponse {
  forecasts: HourlyForecast[];
}

export interface HourlyForecast {
  /**
   * Date and time of the forecast in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
   */
  date: string;
  /**
   * Numeric value representing an image that displays the iconPhrase.
   */
  iconCode: number;
  /**
   * Phrase description of the weather icon.
   */
  iconPhrase: string;
  /**
   * Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation.
   */
  hasPrecipitation: boolean;
  /**
   * Specifies whether or not it is daylight. True indicates day light.
   */
  isDaylight: boolean;
  /**
   * Temperature being returned.
   */
  temperature: WeatherUnit;
  /**
   * RealFeel™ Temperature being returned. Describes what the temperature really feels like in the shade.
   */
  realFeelTemperature: WeatherUnit;
  /**
   * The temperature to which air may be cooled by evaporating water into it at constant pressure until it reaches saturation.
   */
  wetBulbTemperature: WeatherUnit;
  /**
   * The dewpoint temperature in specified unit. The dewpoint temperature is the temperature that the air must be cooled to in order to reach saturation.
   */
  dewPoint: WeatherUnit;
  /**
   * Wind details being returned including speed and direction.
   */
  wind: Wind;
  /**
   * Wind gust. Wind gust is a sudden, brief increase in speed of the wind.
   */
  windGust: Wind;
  /**
   * Relative humidity is the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature.
   */
  relativeHumidity: number;
  /**
   * Visibility in specified unit. A measure of the distance at which an object or light can be clearly discerned.
   */
  visibility: WeatherUnit;
  /**
   * Percent representing cloud cover.
   */
  cloudCover: number;
  /**
   * Cloud ceiling in specified unit. The ceiling is a measurement of the height of the base of the lowest clouds.
   */
  ceiling: WeatherUnit;
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
   * Percent representing the probability of precipitation. For example, '20'.
   */
  precipitationProbability: number;
  /**
   * Percent representing the probability of rain. For example, '50'.
   */
  rainProbability: number;
  /**
   * Percent representing the probability of snow. For example, '50'.
   */
  snowProbability: number;
  /**
   * Percent representing the probability of ice. For example, '5'.
   */
  iceProbability: number;
  /**
   * Total liquid equivalent of precipitation during the forecast period.
   */
  totalLiquid: WeatherUnit;
  /**
   * Rain
   */
  rain: WeatherUnit;
  /**
   * Snow
   */
  snow: WeatherUnit;
  /**
   * Ice
   */
  ice: WeatherUnit;
}

export interface MinuteForecastResponse {
  /**
   * Phrase summaries for the entire forecast period.
   */
  summary: MinuteForecastSummary;
  /**
   * Summary information for each interval in the forecast. The Summaries breaks down each potential interval where precipitation starts and stops.
   */
  intervalSummaries: IntervalSummary[];
  /**
   * Forecast data for each interval in the forecast.
   */
  intervals: Interval[];
}

export interface Interval {
  /**
   * The date and time for the start of the interval in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
   */
  startTime: string;
  /**
   * The first minute for the interval.
   */
  minute: number;
  /**
   * A unit that represents forecasted precipitation intensity.
   */
  dbz: number;
  /**
   * A short phrase describing precipitation condition for the interval.
   */
  shortPhrase: string;
  /**
   * Key that specifies the threshold value. Along with precipitationType, can be used to determine the simplifiedColor. If dbz is zero, not present in the response.
   */
  threshold?: string;
  /**
   * The full spectrum color that maps to the dBZ (decibel relative to Z). If dbz is zero, color is not present in the response.
   */
  color?: Color;
  /**
   * The band color that maps to the precipitation type and threshold. If dbz is zero, not present in the response.
   */
  simplifiedColor?: Color;
  /**
   * Specifies the type of precipitation ("rain" "snow" "ice" or "mix"). If dbz is zero, precipitationType is not present in the response.
   */
  precipitationType?: string;
  /**
   * Numeric value representing an image that displays the iconPhrase.
   */
  iconCode: number;
  /**
   * Percent representing cloud cover.
   */
  cloudCover: number;
}

export interface Color {
  /**
   * Red component of the RGB value.
   */
  red: number;
  /**
   * Green component of the RGB value.
   */
  green: number;
  /**
   * Blue component of the RGB value
   */
  blue: number;
  /**
   * Hexadecimal color value.
   */
  hex: string;
}

export interface IntervalSummary {
  /**
   * The first minute to which the summary applies.
   */
  startMinute: number;
  /**
   * The last minute to which the summary applies.
   */
  endMinute: number;
  /**
   * The number of minutes for which the summary applies.
   */
  totalMinutes: number;
  /**
   * Short summary phrase. Phrase length is approximately 25 characters.
   */
  shortPhrase: string;
  /**
   * Brief summary phrase. Phrase length is approximately 60 characters.
   */
  briefPhrase: string;
  /**
   * Long summary phrase. Phrase length is 60+ characters.
   */
  longPhrase: string;
  /**
   * Numeric value representing an image that displays the iconPhrase.
   */
  iconCode: number;
}

/**
 * Phrase summaries for the entire forecast period.
 */
export interface MinuteForecastSummary {
  /**
   * Summary phrase for the next 60 minutes. Phrase length is approximately 60 characters.
   */
  briefPhrase60: string;
  /**
   * Short summary phrase for the next 120 minutes. Phrase length is approximately 25 characters.
   */
  shortPhrase: string;
  /**
   * Summary phrase for the next 120 minutes. Phrase length is approximately 60 characters.
   */
  briefPhrase: string;
  /**
   * Long summary phrase for the next 120 minutes. Phrase length is 60+ characters.
   */
  longPhrase: string;
  /**
   * Numeric value representing an image that displays the iconPhrase.
   */
  iconCode: number;
}

export interface QuarterDayForecastResponse {
  /**
   * Forecast data for each quarter in the response.
   */
  forecasts: QuarterDayForecast[];
}

export interface QuarterDayForecast {
  /**
   * Date and time of the forecast in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
   */
  date: string;
  /**
   * Date and time of the beginning of the forecast quarter displayed in ISO 8601 format, for example, 2019-10-27T19:39:57-08:00.
   */
  effectiveDate: string;
  /**
   * Quarter of the day.
   */
  quarter: Quarter;
  /**
   * Numeric value representing an image that displays the iconPhrase.
   */
  iconCode: number;
  /**
   * Phrase description of the icon. Displayed in specified language. For example, 'Sunny'.
   */
  iconPhrase: string;
  /**
   * Short summary phrase summary for quarter.
   */
  phrase: string;
  /**
   * Temperature values for the quarter.
   */
  temperature: WeatherUnitRange;
  /**
   * RealFeel™ Temperature values for the quarter.
   */
  realFeelTemperature: WeatherUnitRange;
  /**
   * The dewpoint temperature in specified unit. The dewpoint temperature is the temperature that the air must be cooled to in order to reach saturation.
   */
  dewPoint: WeatherUnit;
  /**
   * Relative humidity is the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature.
   */
  relativeHumidity: number;
  /**
   * Wind details being returned including speed and direction.
   */
  wind: Wind;
  /**
   * Wind gust. Wind gust is a sudden, brief increase in speed of the wind.
   */
  windGust: Wind;
  /**
   * Visibility in specified unit. A measure of the distance at which an object or light can be clearly discerned.
   */
  visibility: WeatherUnit;
  /**
   * Percent representing cloud cover.
   */
  cloudCover: number;
  /**
   * Indicates the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation.
   */
  hasPrecipitation: boolean;
  /**
   * Specifies the type of precipitation ("rain" "snow" "ice" or "mix"). If dbz = zero, precipitationType is not present in the response.
   */
  precipitationType?: string;
  /**
   * Description of the intensity.
   */
  precipitationIntensity?: string;
  /**
   * Percent representing the probability of precipitation. For example, '20'.
   */
  precipitationProbability: number;
  /**
   * Percent representing the probability of a thunderstorm. For example, '10'.
   */
  thunderstormProbability: number;
  /**
   * Total liquid equivalent of precipitation during the forecast period.
   */
  totalLiquid: WeatherUnit;
  /**
   * Rain
   */
  rain: WeatherUnit;
  /**
   * Snow
   */
  snow: WeatherUnit;
  /**
   * Ice
   */
  ice: WeatherUnit;
}
