import { Dispatch } from 'redux';
import axios from 'axios';
import * as constants from '../constants';
import { WeatherData, ApplicationState, Coordinates, Location } from '../interfaces';
import { GOOGLE_API_KEY, OPEN_WEATHER_MAP_KEY } from '../config';
import { getLocationSuccessAction} from './location';
import { getForecast } from './forecast';
import { getCoordinatesSuccessAction } from './coordinates';

export interface GetWeatherDataSuccess {
    type: constants.GET_WEATHER_DATA_SUCCESS;
    currentWeather: WeatherData;
}

export interface GetWeatherDataFailed {
    type: constants.GET_WEATHER_DATA_FAILED;
}

export type GetWeatherData = GetWeatherDataSuccess | GetWeatherDataFailed;

export function getWeatherDataSuccessAction(currentWeather: WeatherData): GetWeatherDataSuccess {
    return {
        type: constants.GET_WEATHER_DATA_SUCCESS,
        currentWeather
    };
}

export function getWeatherDataFailedAction(): GetWeatherDataFailed {
    return {
        type: constants.GET_WEATHER_DATA_FAILED
    };
}

export function getWeatherDataByCoordinates() {
    return async (dispatch: Dispatch<{}>, getState: () => ApplicationState) => {
        const coordinates: Coordinates = getState().coordinates;
        let weatherData: WeatherData;
        let location: Location;
        try {
            let googleResponse =
                await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                                        coordinates.lat + ',' + coordinates.lon + '&language=en&key=' + GOOGLE_API_KEY);
            let googleData = await googleResponse.data;

            location = googleData.results[0].address_components.reduce(
                (
                    acc: {city: string, countryCode: string},
                    component: {long_name: string, short_name: string, types: Array<string>}
                ) => {
                        if (component.types.includes('locality')) {
                            acc.city = component.short_name;
                        }
                        if (component.types.includes('country')) {
                            acc.countryCode = component.short_name;
                        }
                        return acc;
                },
                {city: '', countryCode: ''}
            );

            let weatherResponse =
                await axios.get(
                    'https://api.openweathermap.org/data/2.5/weather?q=' +
                    location.city + ',' + location.countryCode + '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY);
            weatherData = weatherResponse.data;
        }  catch (error) {
            let weatherResponse =
                await axios.get(
                    'https://api.openweathermap.org/data/2.5/weather?lat=' +
                    coordinates.lat + '&lon=' + coordinates.lon +
                    '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY);

            weatherData = await weatherResponse.data;

            location = {
                city: weatherData.name,
                countryCode: weatherData.sys.country
            };
        }
        dispatch(getWeatherDataSuccessAction(weatherData));
        await dispatch(getLocationSuccessAction(location));
        await dispatch(getForecast());
    };
}

export function getWeatherDataByLocation(location: Location) {
    return async (dispatch: Dispatch<{}>) => {
        let request = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather?q=' + location.city + ',' +
            location.countryCode.toLowerCase() + '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY);

        let weatherData: WeatherData = await request.data;
        dispatch(getWeatherDataSuccessAction(weatherData));
        dispatch(getCoordinatesSuccessAction(weatherData.coord));
        await dispatch(getForecast());
    };
}