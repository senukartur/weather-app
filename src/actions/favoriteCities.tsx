import { ADD_FAVORITE_CITY, REMOVE_FAVORITE_CITY } from '../constants';

export interface AddFavoriteCity {
    type: ADD_FAVORITE_CITY;
    cityId: number;
}

export interface RemoveFavoriteCity {
    type: REMOVE_FAVORITE_CITY;
    cityId: number;
}

export function addFavoriteCityAction(cityId: number): AddFavoriteCity {
    return {
        type: ADD_FAVORITE_CITY,
        cityId
    };
}

export function removeFavoriteCity(cityId: number): RemoveFavoriteCity {
    return {
        type: REMOVE_FAVORITE_CITY,
        cityId
    };
}