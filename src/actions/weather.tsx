import { Dispatch } from 'redux';
import axios from 'axios';
import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, FETCH_WEATHER_START } from '../constants';
import { WeatherResponse, ApplicationState, Coordinates, Location, Weather } from '../interfaces';
import { GOOGLE_API_KEY, OPEN_WEATHER_MAP_KEY } from '../config';
import { setLocationSuccessAction } from './location';
import { fetchForecast } from './forecast';
import { weatherResponseToData } from '../scheme';

export interface FetchWeatherSuccess {
    type: FETCH_WEATHER_SUCCESS;
    weather: Weather;
}

export interface FetchWeatherFailure {
    type: FETCH_WEATHER_FAILURE;
    message: string;
}

export interface FetchWeatherStart {
    type: FETCH_WEATHER_START;
}

export function fetchWeatherSuccessAction(weather: Weather): FetchWeatherSuccess {
    return {
        type: FETCH_WEATHER_SUCCESS,
        weather
    };
}

export function fetchWeatherFailureAction(message: string): FetchWeatherFailure {
    return {
        type: FETCH_WEATHER_FAILURE,
        message
    };
}

export function fetchWeatherStartAction(): FetchWeatherStart {
    return {
        type: FETCH_WEATHER_START
    };
}

export function fetchWeatherByCoordinates() {
    return async (dispatch: Dispatch<{}>, getState: () => ApplicationState) => {
        let location: Location = getState().location;
        let coordinates: Coordinates = location.coordinates;
        dispatch(fetchWeatherStartAction());

        try {
            let googleResponse =
                await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                coordinates.latitude + ',' + coordinates.longitude + '&language=en&key=' + GOOGLE_API_KEY);
            let googleData = await googleResponse.data;

            let locationByGoogle = googleData.results[0].address_components.reduce(
                (acc: { city: string, countryCode: string },
                 component: { long_name: string, short_name: string, types: Array<string> }) => {
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

            let weatherResponse: WeatherResponse =
                await (await axios.get(
                'https://api.openweathermap.org/data/2.5/weather?q=' +
                locationByGoogle.city + ',' + locationByGoogle.countryCode +
                '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;
            let weather: Weather = weatherResponseToData(weatherResponse);

            dispatch(fetchWeatherSuccessAction(weather));
            let newLocation: Location = {...location};
            newLocation.countryCode = weather.location.countryCode;
            newLocation.name = weather.location.name;
            newLocation.id = weather.location.id;
            dispatch(setLocationSuccessAction(newLocation));
            await dispatch(fetchForecast());

        } catch (error) {
            try {
                let weatherResponse: WeatherResponse =
                    await (await axios.get(
                        'https://api.openweathermap.org/data/2.5/weather?lat=' +
                        coordinates.latitude + '&lon=' + coordinates.longitude +
                        '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;

                let weather: Weather = weatherResponseToData(weatherResponse);
                dispatch(fetchWeatherSuccessAction(weather));

                let newLocation: Location = {...location};
                newLocation.countryCode = weather.location.countryCode;
                newLocation.name = weather.location.name;
                newLocation.id = weather.location.id;
                dispatch(setLocationSuccessAction(newLocation));
                await dispatch(fetchForecast());
            } catch (error) {
                dispatch(fetchWeatherFailureAction(`Can't find weather for these coordinates!`));
            }
        }
    };
}

export function fetchWeatherByLocation() {
    return async (dispatch: Dispatch<{}>, getState: () => ApplicationState) => {
        try {
            let location: Location = getState().location;
            dispatch(fetchWeatherStartAction());

            let weatherResponse: WeatherResponse =
                await (await axios.get(
                    'https://api.openweathermap.org/data/2.5/weather?q=' + location.name + ',' +
                    location.countryCode.toLowerCase() + '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;

            let weather: Weather = weatherResponseToData(weatherResponse);
            dispatch(fetchWeatherSuccessAction(weather));
            let newLocation: Location = {...location};
            newLocation.coordinates = weather.location.coordinates;
            dispatch(setLocationSuccessAction(newLocation));
            await dispatch(fetchForecast());
        } catch (error) {
            dispatch(fetchWeatherFailureAction(`Can't find weather for this location!`));
        }
    };
}