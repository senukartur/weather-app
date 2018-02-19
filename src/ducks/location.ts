import { Dispatch } from 'redux';

export const SET_LOCATION_SUCCESS = 'SET_LOCATION_SUCCESS';
export type SET_LOCATION_SUCCESS = typeof SET_LOCATION_SUCCESS;

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Location {
    id: number;
    name: string;
    countryCode: string;
    coordinates: Coordinates;
}

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
type Action = SetLocationSuccess;

const initialState: Location = {
    id: 0,
    name: '',
    countryCode: '',
    coordinates: {
        latitude: 0,
        longitude: 0
    }
};

const location = (state: Location = initialState , action: Action): Location => {
    switch (action.type) {
        case SET_LOCATION_SUCCESS:
            return {...action.location};
        default:
            return state;
    }
};

export default location;