import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Weather, { Props } from '../components/weather/Weather';
import { getCurrentUserCoordinates } from '../actions/coordinates';
import { ApplicationState } from '../interfaces';

type StateProps = Pick<Props, 'weather'>;
type DispatchProps = Pick<Props, 'onGetCurrentUserCoordinates'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        weather: state.currentWeatherData
    };
};

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => {
    return ({
        onGetCurrentUserCoordinates: () => dispatch(getCurrentUserCoordinates())
    });
};

const WeatherContainer = connect(mapStateToProps, mapDispatchToProps)(Weather);
export default WeatherContainer;