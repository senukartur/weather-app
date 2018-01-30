import { connect } from 'react-redux';
import ForecastView, { Props } from './ForecastView';
import { ApplicationState } from '../../interfaces';
import { getForecastData } from '../../reducers';

type StateProps = Pick<Props, 'forecastData'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        forecastData: getForecastData(state)
    };
};

const ForecastViewContainer = connect(mapStateToProps)(ForecastView);

export default ForecastViewContainer;