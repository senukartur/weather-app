import { ApplicationState, ForecastData, WeatherData } from './ducks';
import { Location } from './ducks/location';
import { Weather } from './ducks/weatherData';
import { Forecast } from './ducks/forecastData';

export const getLocation = (state: ApplicationState): Location => state.location;

export const getLocationId = (state: ApplicationState): number => {
    return state.location.id;
};

export const getWeatherData = (state: ApplicationState): WeatherData => state.weatherData;

export const getForecastData = (state: ApplicationState): ForecastData => state.forecastData;

export const getFavoriteCities = (state: ApplicationState): number[] => state.favoriteCities;

export const checkFavorite = (state: ApplicationState, cityId: number): boolean => {
    return state.favoriteCities.indexOf(cityId) >= 0;
};

export const getWeatherByCityId = (state: ApplicationState, cityId: number): Weather | null => {
    return state.weatherData[cityId] || null;
};

export const getForecastByCityId = (state: ApplicationState, cityId: number): Forecast | null => {
    return state.forecastData[cityId] || null;
};

export const getFetchingWeather = (state: ApplicationState): boolean => {
    return state.fetchingWeather;
};

export const getFetchingForecast = (state: ApplicationState): boolean => {
    return state.fetchingForecast;
};

export const getErrorMessage = (state: ApplicationState): string => state.errorMessage;