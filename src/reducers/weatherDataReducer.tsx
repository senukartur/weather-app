import { combineReducers } from 'redux';
import { Weather, WeatherData } from '../interfaces';
import { FetchWeatherSuccess, FetchWeatherFailure, FetchWeatherStart } from '../actions/weather';
import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, FETCH_WEATHER_START } from '../constants';

type Action = FetchWeatherSuccess | FetchWeatherFailure | FetchWeatherStart;

function weather(state: Weather | null = null, action: Action ): Weather | null {
    switch (action.type) {
        case FETCH_WEATHER_SUCCESS:
            return {...action.weather};
        default:
            return state;
    }
}

function fetching(state: boolean = false, action: Action ): boolean {
    switch (action.type) {
        case FETCH_WEATHER_START:
            return true;
        case FETCH_WEATHER_SUCCESS:
        case FETCH_WEATHER_FAILURE:
            return false;
        default:
            return state;
    }
}

function error(state: string | null = null, action: Action ): string | null {
    switch (action.type) {
        case FETCH_WEATHER_SUCCESS:
            return null;
        case FETCH_WEATHER_FAILURE:
            return action.message;
        default:
            return state;
    }
}

const weatherData = combineReducers<WeatherData>({
    weather,
    fetching,
    error
});

export default weatherData;