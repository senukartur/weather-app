import { ADD_FAVORITE_CITY, REMOVE_FAVORITE_CITY } from '../constants';
import { AddFavoriteCity, RemoveFavoriteCity } from '../actions/favoriteCities';

type Action = AddFavoriteCity | RemoveFavoriteCity;

function favoriteCities(state: number[] = [], action: Action): number[] {
    switch (action.type) {
        case ADD_FAVORITE_CITY:
            return [...state, action.cityId];
        case REMOVE_FAVORITE_CITY:
            const index = state.indexOf(action.cityId);
            return [...state.slice(0, index), ...state.slice(index + 1)];
        default:
            return state;
    }
}

export default favoriteCities;

export const checkFavorite = (state: number[], cityId: number): boolean => {
    return state.indexOf(cityId) >= 0;
};