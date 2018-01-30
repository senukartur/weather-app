import { Dispatch } from 'redux';
import { Location } from '../interfaces';
import { SET_LOCATION_SUCCESS } from '../constants';

export interface SetLocationSuccess {
    type: SET_LOCATION_SUCCESS;
    location: Location;
}
export function setLocationSuccessAction(location: Location): SetLocationSuccess {
    return {
        type: SET_LOCATION_SUCCESS,
        location
    };
}

export function setLocation(location: Location) {
    return async (dispatch: Dispatch<{}>) => {
        dispatch(setLocationSuccessAction(location));
    };
}