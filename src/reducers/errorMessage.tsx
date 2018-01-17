import { GetForecastDataFailed } from '../actions/forecast';
import { GetCoordinatesFailed } from '../actions/coordinates';
import { GET_FORECAST_DATA_FAILED, GET_COORDINATES_FAILED } from '../constants';

type Action = GetForecastDataFailed | GetCoordinatesFailed;

function errorMessage (state: string = '', action: Action): string {
    switch (action.type) {
        case GET_FORECAST_DATA_FAILED:
            return action.message;
        case GET_COORDINATES_FAILED:
            return action.message;
        default:
            return state;
    }
}

export default errorMessage;