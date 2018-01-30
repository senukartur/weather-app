import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import WeatherFinder, { Props } from './WeatherFinder';
import { setLocation } from '../../actions/location';
import { fetchWeatherByLocation, fetchWeatherByCoordinates } from '../../actions/weather';
import { ApplicationState, Location } from '../../interfaces';
import { getLocation } from '../../reducers';

type StateProps = Pick<Props, 'location'>;
type DispatchProps = Pick<Props, 'onSetLocation' | 'onFetchWeatherByLocation' | 'onFetchWeatherByCoordinates'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        location: getLocation(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => {
    return (
        {
            onSetLocation: (location: Location) => dispatch(setLocation(location)),
            onFetchWeatherByLocation: () => dispatch(fetchWeatherByLocation()),
            onFetchWeatherByCoordinates: () => dispatch(fetchWeatherByCoordinates())
        }
    );
};

const WeatherFinderContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherFinder);
export default WeatherFinderContainer;
