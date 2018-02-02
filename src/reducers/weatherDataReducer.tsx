import { Weather, WeatherData } from '../interfaces';
import { FetchWeatherSuccess, FetchWeatherFailure, FetchWeatherStart } from '../actions/weatherData';
import { FETCH_WEATHER_SUCCESS } from '../constants';

type Action = FetchWeatherSuccess | FetchWeatherFailure | FetchWeatherStart;

function weatherData(state: WeatherData = {}, action: Action ): WeatherData {
    switch (action.type) {
        case FETCH_WEATHER_SUCCESS:
            const cityId: number = action.weather.location.id;

            return {...state, [cityId]: action.weather};
        default:
            return state;
    }
}

export const getWeatherByCityId = (state: WeatherData, id: number): Weather | null => {
    return state[id] || null;
};

export default weatherData;