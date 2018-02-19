import { connect, MapStateToProps } from 'react-redux';
import FavoriteCityView, { Props } from './FavoriteCityView';
import { ApplicationState } from '../../ducks';
import { getWeatherByCityId } from '../../selectors';

type StateProps = Pick<Props, 'weather'>;
type OwnProps = {
    cityId: number;
};

const mapStateToProps: MapStateToProps<StateProps, OwnProps> = (
    state: ApplicationState, ownProps: OwnProps): StateProps => {
    let weather = getWeatherByCityId(state, ownProps.cityId);

    return {
        weather: weather
    };
};

const FavoriteCityViewContainer = connect(mapStateToProps)(FavoriteCityView);

export default FavoriteCityViewContainer;