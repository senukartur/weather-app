import { FETCH_FORECAST_START, FETCH_FORECAST_SUCCESS, FETCH_FORECAST_FAILURE } from '../constants';
import { FetchForecastStart, FetchForecastSuccess, FetchForecastFailure } from '../actions/forecastData';

type Action = FetchForecastStart | FetchForecastSuccess | FetchForecastFailure;

const fetchingForecast = (state: boolean = false, action: Action): boolean => {
    switch (action.type) {
        case FETCH_FORECAST_START:
            return true;
        case FETCH_FORECAST_SUCCESS:
        case FETCH_FORECAST_FAILURE:
            return false;
        default:
            return state;
    }
};

export default fetchingForecast;