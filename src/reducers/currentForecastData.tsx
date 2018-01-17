import { ForecastData } from '../interfaces';
import { GetForecastData } from '../actions/forecast';
import { GET_FORECAST_DATA_FAILED, GET_FORECAST_DATA_SUCCESS } from '../constants';

type Action = GetForecastData;

function currentForecastData(state: ForecastData | null = null, action: Action): ForecastData | null {
    switch (action.type) {
        case GET_FORECAST_DATA_SUCCESS:
            return {...action.currentForecast};
        case GET_FORECAST_DATA_FAILED:
            return state;
        default:
            return state;
    }
}

export default currentForecastData;