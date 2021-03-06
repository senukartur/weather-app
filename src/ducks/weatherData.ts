import { Dispatch } from 'redux';
import axios from 'axios';
import { Coordinates, Location } from './location';
import { ApplicationState, WeatherData } from './index';
import { GOOGLE_API_KEY, OPEN_WEATHER_MAP_KEY } from '../config';
import { setLocationSuccessAction } from './location';
import { fetchForecastByCoordinates, fetchForecastByLocation, fetchForecastByCityId } from './forecastData';
import { weatherResponseToData } from '../scheme';

export const FETCH_WEATHER_START = 'FETCH_WEATHER_START';
export type FETCH_WEATHER_START = typeof FETCH_WEATHER_START;

export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export type FETCH_WEATHER_SUCCESS = typeof FETCH_WEATHER_SUCCESS;

export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export type FETCH_WEATHER_FAILURE = typeof FETCH_WEATHER_FAILURE;

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

export interface WeatherResponse {
    coord: {lat: number; lon: number};
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    base: string;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        message: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    id: number;
    name: string;
    cod: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
    params: WeatherParams;
    wind: Wind;
    clouds: {
        all: number;
    };
    location: Location;
}

export interface WeatherParams {
    temperature: number;
    temperatureMin: number;
    temperatureMax: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export function fetchWeatherByCoordinates(setLocation: boolean) {
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

            if (!weather.location.countryCode || !weather.location.name || !weather.location.id) {
                throw Error();
            }

            dispatch(fetchWeatherSuccessAction(weather));

            if (setLocation) {
                let newLocation: Location = {...location};
                newLocation.countryCode = weather.location.countryCode;
                newLocation.name = weather.location.name;
                newLocation.id = weather.location.id;

                dispatch(setLocationSuccessAction(newLocation));
            }

            await dispatch(fetchForecastByLocation());
        } catch (error) {
            try {
                let weatherResponse: WeatherResponse =
                    await (await axios.get(
                        'https://api.openweathermap.org/data/2.5/weather?lat=' +
                        coordinates.latitude + '&lon=' + coordinates.longitude +
                        '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;

                let weather: Weather = weatherResponseToData(weatherResponse);

                if (!weather.location.countryCode || !weather.location.name || !weather.location.id) {
                    throw Error();
                }

                dispatch(fetchWeatherSuccessAction(weather));

                if (setLocation) {
                    let newLocation: Location = {...location};
                    newLocation.countryCode = weather.location.countryCode;
                    newLocation.name = weather.location.name;
                    newLocation.id = weather.location.id;

                    dispatch(setLocationSuccessAction(newLocation));
                }
                await dispatch(fetchForecastByCoordinates());
            } catch (error) {
                dispatch(fetchWeatherFailureAction(`Can't find weather for these coordinates!`));
            }
        }
    };
}

export function fetchWeatherByLocation(setLocation: boolean) {
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

            if (setLocation) {
                let newLocation: Location = {...location};
                newLocation.id = weather.location.id;
                newLocation.coordinates = weather.location.coordinates;
                dispatch(setLocationSuccessAction(newLocation));
            }

            await dispatch(fetchForecastByLocation());
        } catch (error) {
            dispatch(fetchWeatherFailureAction(`Can't find weather for this location!`));
        }
    };
}

export function fetchWeatherByCityId(cityId: number) {
    return async (dispatch: Dispatch<{}>) => {
        try {
            let weatherResponse: WeatherResponse =
                await (await axios.get(
                    'https://api.openweathermap.org/data/2.5/weather?id=' + cityId + ',' +
                    '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;
            let weather: Weather = weatherResponseToData(weatherResponse);
            dispatch(fetchWeatherSuccessAction(weather));
            await  dispatch(fetchForecastByCityId(cityId));
        } catch (error) {
            dispatch(fetchWeatherFailureAction(`Can't find weather for this city id!`));
        }
    };
}

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

export default weatherData;