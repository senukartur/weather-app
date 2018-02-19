import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import WeatherFinder, { Props } from './WeatherFinder';
import {
    ApplicationState,
    Location,
    setLocation,
    fetchWeatherByLocation,
    fetchWeatherByCoordinates
} from '../../ducks';
import { getLocation } from '../../selectors';

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
            onFetchWeatherByLocation: () => dispatch(fetchWeatherByLocation(true)),
            onFetchWeatherByCoordinates: () => dispatch(fetchWeatherByCoordinates(true))
        }
    );
};

const WeatherFinderContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherFinder);

export default WeatherFinderContainer;
