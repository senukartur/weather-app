import * as constants from '../constants';
import { GetCoordinatesAction } from '../actions/coordinates';
import { Coordinates } from '../interfaces';

type Action = GetCoordinatesAction;

function coordinates(state: Coordinates = {lat: 0, lon: 0}, action: Action): Coordinates {
    switch (action.type) {
        case constants.GET_COORDINATES_SUCCESS:
            return {...state, lat: action.coordinates.lat, lon: action.coordinates.lon };
        case constants.GET_COORDINATES_FAILED:
            return state;
        default:
            return state;
    }
}

export default coordinates;