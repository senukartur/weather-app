import { Dispatch } from 'redux';
import { Location } from '../interfaces';
import { GET_LOCATION_SUCCESS, GET_LOCATION_FAILED } from '../constants';
import { getWeatherDataByLocation } from './weather';

export interface GetLocationSuccess {
    type: GET_LOCATION_SUCCESS;
    location: Location;
}

export interface GetLocationFailed {
    type: GET_LOCATION_FAILED;
}

export type GetLocationAction = GetLocationSuccess | GetLocationFailed;

export function getLocationSuccessAction(location: Location): GetLocationSuccess {
    return {
        type: GET_LOCATION_SUCCESS,
        location
    };
}

export function getLocationFailedAction(): GetLocationFailed {
    return {
        type: GET_LOCATION_FAILED
    };
}

export function getLocation(location: Location) {
    return async (dispatch: Dispatch<{}>) => {
        dispatch(getLocationSuccessAction(location));
        await dispatch(getWeatherDataByLocation(location));
    };
}