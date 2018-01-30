import { combineReducers } from 'redux';
import { Forecast, ForecastData } from '../interfaces';
import { FetchForecastSuccess, FetchForecastFailure } from '../actions/forecast';
import { FETCH_FORECAST_SUCCESS, FETCH_FORECAST_FAILURE } from '../constants';

type Action = FetchForecastSuccess | FetchForecastFailure;

function forecast(state: Forecast | null = null, action: Action): Forecast | null {
    switch (action.type) {
        case FETCH_FORECAST_SUCCESS:
            return {...action.forecast};
        default:
            return state;
    }
}

function fetching(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case FETCH_FORECAST_SUCCESS:
        case FETCH_FORECAST_FAILURE:
            return false;
        default:
            return state;
    }
}

function error(state: string | null = null, action: Action): string | null {
    switch (action.type) {
        case FETCH_FORECAST_SUCCESS:
            return null;
        case FETCH_FORECAST_FAILURE:
            return action.message;
        default:
            return state;
    }
}

const forecastData = combineReducers<ForecastData>({
    forecast,
    fetching,
    error
});

export default forecastData;