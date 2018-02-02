import { SET_LOCATION_SUCCESS } from '../constants';
import { SetLocationSuccess } from '../actions/location';
import { Location } from '../interfaces';

type Action = SetLocationSuccess;

const defaultState: Location = {
    id: 0,
    name: '',
    countryCode: '',
    coordinates: {
        latitude: 0,
        longitude: 0
    }
};

const location = (state: Location = defaultState , action: Action): Location => {
    switch (action.type) {
        case SET_LOCATION_SUCCESS:
            return {...action.location};
        default:
            return state;
    }
};

export default location;

export const getLocationId = (state: Location) => {
    return state.id;
};