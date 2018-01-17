import { WeatherData } from '../interfaces';
import { GetWeatherData } from '../actions/weather';
import * as constants from '../constants';

type Action = GetWeatherData;

function currentWeatherData(state: WeatherData | null = null, action: Action ) {
    switch (action.type) {
        case constants.GET_WEATHER_DATA_SUCCESS:
            return action.currentWeather;
        case constants.GET_WEATHER_DATA_FAILED:
            return state;
        default:
            return state;
    }
}

export default currentWeatherData;