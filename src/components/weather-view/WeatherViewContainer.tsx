import { connect } from 'react-redux';
import WeatherView, { Props } from './WeatherView';
import { ApplicationState } from '../../interfaces/index';

type StateProps = Pick<Props, 'weather' | 'errorMessage'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        weather: state.currentWeatherData,
        errorMessage: state.errorMessage
    };
};

const WeatherViewContainer = connect(mapStateToProps)(WeatherView);
export default WeatherViewContainer;