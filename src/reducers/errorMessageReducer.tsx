import {
    FETCH_WEATHER_START,
    FETCH_WEATHER_FAILURE,
    FETCH_WEATHER_SUCCESS,
    FETCH_FORECAST_START,
    FETCH_FORECAST_SUCCESS,
    FETCH_FORECAST_FAILURE
} from '../constants';
import { FetchWeatherStart, FetchWeatherSuccess, FetchWeatherFailure } from '../actions/weatherData';
import { FetchForecastStart, FetchForecastSuccess, FetchForecastFailure } from '../actions/forecastData';

type Action =
    FetchWeatherStart |
    FetchWeatherSuccess |
    FetchWeatherFailure |
    FetchForecastStart |
    FetchForecastSuccess |
    FetchForecastFailure;

const errorMessage = (state: string = '', action: Action): string => {
    switch (action.type) {
        case FETCH_WEATHER_START:
        case FETCH_WEATHER_SUCCESS:
        case FETCH_FORECAST_START:
        case FETCH_FORECAST_SUCCESS:
            return '';
        case FETCH_WEATHER_FAILURE:
        case FETCH_FORECAST_FAILURE:
            return action.message;
        default:
            return state;
    }
};

export default errorMessage;