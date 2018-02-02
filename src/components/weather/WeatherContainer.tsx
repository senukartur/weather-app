import { connect } from 'react-redux';
import Weather, { Props } from './Wethaer';
import { ApplicationState } from '../../interfaces';
import { getLocationId } from '../../reducers';

type StateProps = Pick<Props, 'cityId'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        cityId: getLocationId(state)
    };
};

const WeatherContainer = connect(mapStateToProps)(Weather);

export default WeatherContainer;