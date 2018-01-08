import { Dispatch } from 'redux';
import * as constants from './../constants';
import * as interfaces from './../interfaces';
import { getWeatherDataByCoordinates } from './weather';

export interface GetCurrentUserCoordinatesSuccess {
    type: constants.GET_CURRENT_USER_COORDINATES_SUCCESS;
    coordinates: interfaces.Coordinates;
}

export interface GetCurrentUserCoordinatesFailed {
    type: constants.GET_CURRENT_USER_COORDINATES_FAILED;
}

export type GetCurrentUserCoordinatesAction = GetCurrentUserCoordinatesSuccess | GetCurrentUserCoordinatesFailed;

export function getCurrentUserCoordinatesSuccessAction(coordinates: interfaces.Coordinates): GetCurrentUserCoordinatesSuccess {
    return {
        type: constants.GET_CURRENT_USER_COORDINATES_SUCCESS,
        coordinates
    };
}

export function getCurrenttUserCoordinatesFailedAction(): GetCurrentUserCoordinatesFailed {
    return {
        type: constants.GET_CURRENT_USER_COORDINATES_FAILED
    };
}

export function  getCurrentUserCoordinates() {
    return (dispatch: Dispatch<{}>) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let coordinates: interfaces.Coordinates = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            dispatch(getCurrentUserCoordinatesSuccessAction(coordinates));
            await dispatch(getWeatherDataByCoordinates());
        });
    };
}