import { connect } from 'react-redux';
import WeatherView, { Props } from './WeatherView';
import { ApplicationState } from '../../interfaces';
import { getWeatherData } from '../../reducers';

type StateProps = Pick<Props, 'weatherData'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        weatherData: getWeatherData(state),
    };
};

const WeatherViewContainer = connect(mapStateToProps)(WeatherView);
export default WeatherViewContainer;