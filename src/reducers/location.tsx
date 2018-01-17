import { GET_LOCATION_SUCCESS, GET_LOCATION_FAILED } from '../constants';
import { GetLocationAction } from '../actions/location';
import { Location } from '../interfaces';

type Action = GetLocationAction;

function location(state: Location = {city: '', countryCode: ''} , action: Action): Location {
    switch (action.type) {
        case GET_LOCATION_SUCCESS:
            return {...action.location};
        case GET_LOCATION_FAILED:
            return state;
        default:
            return state;
    }
}

export default location;