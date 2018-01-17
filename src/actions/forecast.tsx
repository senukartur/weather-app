import { Dispatch } from 'redux';
import axios from 'axios';
import { GET_FORECAST_DATA_SUCCESS, GET_FORECAST_DATA_FAILED } from '../constants';
import { ApplicationState, ForecastData, Coordinates } from '../interfaces';
import { OPEN_WEATHER_MAP_KEY } from '../config';

export interface GetForecastDataSuccess {
    type: GET_FORECAST_DATA_SUCCESS;
    currentForecast: ForecastData;
}

export interface GetForecastDataFailed {
    type: GET_FORECAST_DATA_FAILED;
    message: string;
}

export type GetForecastData = GetForecastDataSuccess | GetForecastDataFailed;

export function getForecastDataSuccessAction (currentForecast: ForecastData): GetForecastDataSuccess {
    return {
        type: GET_FORECAST_DATA_SUCCESS,
        currentForecast
    };
}

export function getForecastDataFailed(message: string): GetForecastDataFailed {
    return {
        type: GET_FORECAST_DATA_FAILED,
        message
    };
}

export function getForecast() {
    return async (dispatch: Dispatch<{}>, getState: () => ApplicationState) => {
        try {
            const coordinates: Coordinates = getState().coordinates;
            const forecastResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' +
                coordinates.lat + '&lon=' + coordinates.lon + '&lang=en&units=metric&appid=' + OPEN_WEATHER_MAP_KEY);
            const forecastData = await forecastResponse.data;
            dispatch(getForecastDataSuccessAction(forecastData));
        } catch (e) {
            dispatch(getForecastDataFailed(e.message));
        }
    };
}