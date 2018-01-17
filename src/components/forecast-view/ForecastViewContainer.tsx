import { connect } from 'react-redux';
import ForecastView, { Props } from './ForecastView';
import { ApplicationState } from '../../interfaces';

type StateProps = Pick<Props, 'forecast'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        forecast: state.currentForecastData
    };
};

const ForecastViewContainer = connect(mapStateToProps)(ForecastView);

export default ForecastViewContainer;