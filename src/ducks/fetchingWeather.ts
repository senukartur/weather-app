import {
    FETCH_WEATHER_START,
    FETCH_WEATHER_FAILURE,
    FETCH_WEATHER_SUCCESS
} from './weatherData';

import { FetchWeatherStart, FetchWeatherSuccess, FetchWeatherFailure } from './weatherData';

type Action = FetchWeatherStart | FetchWeatherSuccess | FetchWeatherFailure;

function fetchingWeather(state: boolean = false, action: Action): boolean {
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

export default fetchingWeather;
