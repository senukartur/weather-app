export const ADD_FAVORITE_CITY = 'ADD_FAVORITE_CITY';
export type ADD_FAVORITE_CITY = typeof ADD_FAVORITE_CITY;

export const REMOVE_FAVORITE_CITY = 'REMOVE_FAVORITE_CITY';
export type REMOVE_FAVORITE_CITY = typeof REMOVE_FAVORITE_CITY;

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
