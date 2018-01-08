import { combineReducers } from 'redux';
import coordinates from './coordinates';
import currentWeatherData from './currentWeatherData';
import { ApplicationState } from '../interfaces';

export default combineReducers<ApplicationState>({
    coordinates,
    currentWeatherData
});