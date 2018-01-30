import { Dispatch } from 'redux';
import axios from 'axios';
import { FETCH_FORECAST_SUCCESS, FETCH_FORECAST_FAILURE } from '../constants';
import { ApplicationState, ForecastResponse, Coordinates, Forecast } from '../interfaces';
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

export function fetchForecastSuccessAction (forecast: Forecast): FetchForecastSuccess {
    return {
        type: FETCH_FORECAST_SUCCESS,
        forecast
    };
}

export function FetchForecastFailureAction(message: string): FetchForecastFailure {
    return {
        type: FETCH_FORECAST_FAILURE,
        message
    };
}

export function fetchForecast() {
    return async (dispatch: Dispatch<{}>, getState: () => ApplicationState) => {
        const coordinates: Coordinates = getState().location.coordinates;
        const forecastResponse: ForecastResponse =
            await (await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' +
            coordinates.latitude + '&lon=' + coordinates.longitude +
                '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY)).data;
        const forecast: Forecast = forecastResponseToData(forecastResponse);
        dispatch(fetchForecastSuccessAction(forecast));
    };
}