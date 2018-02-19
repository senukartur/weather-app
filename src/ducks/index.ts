import location, { Location } from './location';
import weatherData, { Weather } from './weatherData';
import forecastData, { Forecast } from './forecastData';
import fetchingWeather from './fetchingWeather';
import fetchingForecast from './fetchingForecast';
import errorMessage from './errorMessage';
import favoriteCities from './favoriteCities';

export interface ApplicationState {
    location: Location;
    fetchingWeather: boolean;
    fetchingForecast: boolean;
    weatherData: WeatherData;
    forecastData: ForecastData;
    favoriteCities: number[];
    errorMessage: string;
}

export interface WeatherData {
    [key: number]: Weather;
}

export interface ForecastData {
    [key: number]: Forecast;
}

export const appReducers = {
    location,
    fetchingWeather,
    fetchingForecast,
    weatherData,
    forecastData,
    favoriteCities,
    errorMessage
};

export * from './weatherData';
export * from './forecastData';
export * from './location';
export * from './favoriteCities';