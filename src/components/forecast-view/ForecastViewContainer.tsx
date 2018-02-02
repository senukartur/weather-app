import { connect, MapStateToProps } from 'react-redux';
import ForecastView, { Props } from './ForecastView';
import { ApplicationState } from '../../interfaces';
import { getForecastByCityId, getFetchingForecast } from '../../reducers';

type OwnProps = {
    cityId: number
};

type StateProps = Pick<Props, 'forecast' | 'fetchingForecast'>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps> =
    (state: ApplicationState, ownProps: OwnProps): StateProps => {
    return {
        forecast: getForecastByCityId(state, ownProps.cityId),
        fetchingForecast: getFetchingForecast(state)
    };
};

const ForecastViewContainer = connect(mapStateToProps)(ForecastView);

export default ForecastViewContainer;