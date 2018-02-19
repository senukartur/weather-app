import { connect } from 'react-redux';
import Weather, { Props } from './Weather';
import { ApplicationState } from '../../ducks';
import { getLocationId } from '../../selectors';

type StateProps = Pick<Props, 'cityId'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        cityId: getLocationId(state)
    };
};

const WeatherContainer = connect(mapStateToProps)(Weather);

export default WeatherContainer;