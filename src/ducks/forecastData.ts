import { Dispatch } from 'redux';
import axios from 'axios';
import { ApplicationState, ForecastData } from './index';
import { Coordinates, Location } from './location';
import { Weather } from './weatherData';
import { OPEN_WEATHER_MAP_KEY } from '../config';
import { forecastResponseToData } from '../scheme';

export const FETCH_FORECAST_START = 'FETCH_FORECAST_START';
export type FETCH_FORECAST_START = typeof FETCH_FORECAST_START;

export const FETCH_FORECAST_SUCCESS = 'FETCH_FORECAST_SUCCESS';
export type FETCH_FORECAST_SUCCESS = typeof FETCH_FORECAST_SUCCESS;

export const FETCH_FORECAST_FAILURE = 'FETCH_FORECAST_FAILURE';
export type FETCH_FORECAST_FAILURE = typeof FETCH_FORECAST_FAILURE;

export interface FetchForecastSuccess {
    type: FETCH_FORECAST_SUCCESS;
    forecast: Forecast;
}

export interface FetchForecastFailure {
    type: FETCH_FORECAST_FAILURE;
    message: string;
}

export interface FetchForecastStart {
    type: FETCH_FORECAST_START;
}

export const fetchForecastSuccessAction = (forecast: Forecast): FetchForecastSuccess => {
    return {
        type: FETCH_FORECAST_SUCCESS,
        forecast
    };
};

export const fetchForecastFailureAction = (message: string): FetchForecastFailure => {
    return {
        type: FETCH_FORECAST_FAILURE,
        message
    };
};

export const fetchForecastStartAction = (): FetchForecastStart => {
    return {
        type: FETCH_FORECAST_START
    };
};

export interface ForecastResponse {
    code: string;
    message: number;
    city: {
        id: number;
        name: string;
        coord: {lat: number; lon: number};
        country: string;
    };
    cnt: number;
    list: Array<{
        dt: number;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: Weather[];
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
        };
        dt_txt: string;
    }>;
}

export interface ForecastItem {
    timestamp: number;
    weather: Weather;
}

export interface Forecast {
    location: Location;
    list: ForecastItem[];
}

export function fetchForecastByCoordinates() {
    return async (dispatch: Dispatch<{}>, getState: () => ApplicationState) => {
        dispatch(fetchForecastStartAction());

        try {
            const coordinates: Coordinates = getState().location.coordinates;
            const forecastResponse: ForecastResponse =
                await (await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' +
                    coordinates.latitude + '&lon=' + coordinates.longitude +
                    '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;
            const forecast: Forecast = forecastResponseToData(forecastResponse);
            dispatch(fetchForecastSuccessAction(forecast));
        } catch (error) {
            dispatch(fetchForecastFailureAction('Fetch forecast error'));
        }

    };
}

export function fetchForecastByLocation() {
    return async (dispatch: Dispatch<{}>, getState: () => ApplicationState) => {
        dispatch(fetchForecastStartAction());
        try {
            const location: Location = getState().location;

            const forecastResponse: ForecastResponse =
                await (await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' +
                    location.name + ',' + location.countryCode +
                    '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;
            const forecast: Forecast = forecastResponseToData(forecastResponse);
            dispatch(fetchForecastSuccessAction(forecast));
        } catch (error) {
            dispatch(fetchForecastFailureAction('Fetch forecast error'));
        }
    };
}

export function fetchForecastByCityId(cityId: number) {
    return async (dispatch: Dispatch<{}>) => {
        try {
            const forecastResponse: ForecastResponse =
                await (await axios.get('https://api.openweathermap.org/data/2.5/forecast?id=' +
                    cityId +
                    '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;
            const forecast: Forecast = forecastResponseToData(forecastResponse);
            dispatch(fetchForecastSuccessAction(forecast));
        } catch (error) {
            dispatch(fetchForecastFailureAction('Fetch forecast error'));
        }
    };
}

type Action = FetchForecastSuccess | FetchForecastFailure;

function forecastData(state: ForecastData = {}, action: Action): ForecastData {
    switch (action.type) {
        case FETCH_FORECAST_SUCCESS:
            const cityId: number = action.forecast.location.id;

            return {...state, [cityId]: action.forecast};
        default:
            return state;
    }
}

export default forecastData;