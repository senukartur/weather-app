import { Forecast, ForecastData } from '../interfaces';
import { FetchForecastSuccess, FetchForecastFailure } from '../actions/forecastData';
import { FETCH_FORECAST_SUCCESS } from '../constants';

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

export const getForecastByCityId = (state: ForecastData, cityId: number): Forecast | null => {
    return state[cityId] || null;
};