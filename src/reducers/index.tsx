import { combineReducers } from 'redux';
import coordinates from './coordinates';
import location from './location';
import currentWeatherData from './currentWeatherData';
import currentForecastData from './currentForecastData';
import errorMessage from './errorMessage';
import { ApplicationState } from '../interfaces';

export default combineReducers<ApplicationState>({
    coordinates,
    location,
    currentWeatherData,
    currentForecastData,
    errorMessage
});