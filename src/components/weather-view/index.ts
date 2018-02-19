import { Dispatch } from 'redux';
import { connect, MapStateToProps } from 'react-redux';
import WeatherView, { Props } from './WeatherView';
import { ApplicationState, addFavoriteCityAction, removeFavoriteCity } from '../../ducks';
import { checkFavorite, getWeatherByCityId, getFetchingWeather } from '../../selectors';

type StateProps = Pick<Props, 'weather' | 'isFavorite' | 'fetchingWeather'>;
type DispatchProps = Pick<Props, 'addToFavorite' | 'removeFromFavorite'>;
type OwnProps = {
    cityId: number;
};

const mapStateToProps: MapStateToProps<StateProps, OwnProps> =
    (state: ApplicationState, ownProps: OwnProps): StateProps => {
    return {
        weather: getWeatherByCityId(state, ownProps.cityId),
        isFavorite: checkFavorite(state, ownProps.cityId),
        fetchingWeather: getFetchingWeather(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => {
    return {
        addToFavorite: (cityId: number) => dispatch(addFavoriteCityAction(cityId)),
        removeFromFavorite: (cityId: number) => dispatch(removeFavoriteCity(cityId))
    };
};

const WeatherViewContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherView);
export default WeatherViewContainer;