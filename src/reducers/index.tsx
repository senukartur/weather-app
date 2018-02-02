import { combineReducers } from 'redux';
import location, * as fromLocation from './location';
import fetchingWeather from './fetchingWeatherReducer';
import fetchingForecast from './fetchingForecastReducer';
import errorMessage from './errorMessageReducer';
import weatherData, * as fromWeatherData from './weatherDataReducer';
import forecastData, * as fromForecastData from './forecastDataReducer';
import favoriteCities, * as fromFavoriteCity from './favoriteCitiesReducer';
import { ApplicationState, Location, WeatherData, ForecastData, Weather, Forecast } from '../interfaces';

export default combineReducers<ApplicationState>({
    location,
    fetchingWeather,
    fetchingForecast,
    weatherData,
    forecastData,
    favoriteCities,
    errorMessage
});

export const getLocation = (state: ApplicationState): Location => state.location;

export const getLocationId = (state: ApplicationState): number => {
    return fromLocation.getLocationId(state.location);
};

export const getWeatherData = (state: ApplicationState): WeatherData => state.weatherData;

export const getForecastData = (state: ApplicationState): ForecastData => state.forecastData;

export const getFavoriteCities = (state: ApplicationState): number[] => state.favoriteCities;

export const checkFavorite = (state: ApplicationState, cityId: number): boolean => {
    return fromFavoriteCity.checkFavorite(state.favoriteCities, cityId);
};

export const getWeatherByCityId = (state: ApplicationState, id: number): Weather | null => {
    return fromWeatherData.getWeatherByCityId(state.weatherData, id);
};

export const getForecastByCityId = (state: ApplicationState, cityId: number): Forecast | null => {
    return fromForecastData.getForecastByCityId(state.forecastData, cityId);
};

export const getFetchingWeather = (state: ApplicationState): boolean => {
    return state.fetchingWeather;
};

export const getFetchingForecast = (state: ApplicationState): boolean => {
    return state.fetchingForecast;
};

export const getErrorMessage = (state: ApplicationState): string => state.errorMessage;