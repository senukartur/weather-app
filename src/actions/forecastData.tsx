import { Dispatch } from 'redux';
import axios from 'axios';
import { FETCH_FORECAST_SUCCESS, FETCH_FORECAST_FAILURE, FETCH_FORECAST_START } from '../constants';
import { ApplicationState, ForecastResponse, Coordinates, Forecast, Location } from '../interfaces';
import { OPEN_WEATHER_MAP_KEY } from '../config';
import { forecastResponseToData } from '../scheme';

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