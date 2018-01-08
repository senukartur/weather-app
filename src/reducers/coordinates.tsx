import * as constants from '../constants';
import { GetCurrentUserCoordinatesAction } from '../actions/coordinates';
import * as interfaces from '../interfaces';

type Action = GetCurrentUserCoordinatesAction;

function coordinates(state: interfaces.Coordinates = {lat: 0, lon: 0}, action: Action): interfaces.Coordinates {
    switch (action.type) {
        case constants.GET_CURRENT_USER_COORDINATES_SUCCESS:
            return {...state, lat: action.coordinates.lat, lon: action.coordinates.lon };
        case constants.GET_CURRENT_USER_COORDINATES_FAILED:
            return state;
        default:
            return state;
    }
}

export default coordinates;