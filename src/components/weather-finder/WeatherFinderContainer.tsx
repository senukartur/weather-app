import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import WeatherFinder, { Props } from './WeatherFinder';
import { getCurrentUserCoordinates, getCoordinates } from '../../actions/coordinates';
import { getLocation } from '../../actions/location';
import { ApplicationState, Coordinates, Location } from '../../interfaces/index';

type StateProps = Pick<Props, 'coordinates' | 'location'>;
type DispatchProps = Pick<Props, 'handleCurrentUserCoordinates' | 'handleCustomCoordinates' | 'handleCustomLocation'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        coordinates: state.coordinates,
        location: state.location
    };
};

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => {
    return (
        {
            handleCurrentUserCoordinates: () => dispatch(getCurrentUserCoordinates()),
            handleCustomCoordinates: (coordinates: Coordinates) => dispatch(getCoordinates(coordinates)),
            handleCustomLocation: (location: Location) =>
                dispatch(getLocation(location))
        }
    );
};

const WeatherFinderContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherFinder);
export default WeatherFinderContainer;
