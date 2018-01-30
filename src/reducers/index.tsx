import { combineReducers } from 'redux';
import location from './location';
import weatherData from './weatherDataReducer';
import forecastData from './forecastDataReducer';
import { ApplicationState, Location, WeatherData, ForecastData } from '../interfaces';

export default combineReducers<ApplicationState>({
    location,
    weatherData,
    forecastData,
});

export const getLocation = (state: ApplicationState): Location => state.location;
export const getWeatherData = (state: ApplicationState): WeatherData => state.weatherData;
export const getForecastData = (state: ApplicationState): ForecastData => state.forecastData;