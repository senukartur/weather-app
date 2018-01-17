import { Dispatch } from 'redux';
import * as constants from '../constants';
import { Coordinates } from '../interfaces';
import { getWeatherDataByCoordinates } from './weather';

export interface GetCoordinatesSuccess {
    type: constants.GET_COORDINATES_SUCCESS;
    coordinates: Coordinates;
}

export interface GetCoordinatesFailed {
    type: constants.GET_COORDINATES_FAILED;
    message: string;
}

export type GetCoordinatesAction = GetCoordinatesSuccess | GetCoordinatesFailed;

export function getCoordinatesSuccessAction(coordinates: Coordinates): GetCoordinatesSuccess {
    return {
        type: constants.GET_COORDINATES_SUCCESS,
        coordinates
    };
}

export function getCoordinatesFailedAction(message: string): GetCoordinatesFailed {
    return {
        type: constants.GET_COORDINATES_FAILED,
        message
    };
}

export function  getCurrentUserCoordinates() {
    return (dispatch: Dispatch<{}>) => {
        const successCallback = async (position: Position) => {
            let coordinates: Coordinates = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            dispatch(getCoordinatesSuccessAction(coordinates));
        };

        const errorCallback = (positionError: PositionError) => {
            console.log(positionError);
            dispatch(getCoordinatesFailedAction(positionError.message));
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    };
}

export function getCoordinates(coordinates: Coordinates) {
    return async (dispatch: Dispatch<{}>) => {
        dispatch(getCoordinatesSuccessAction(coordinates));
        await dispatch(getWeatherDataByCoordinates());
    };
}