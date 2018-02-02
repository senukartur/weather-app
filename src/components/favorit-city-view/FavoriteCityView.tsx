import * as React from 'react';
import { Weather } from '../../interfaces';
import WeatherViewContainer from '../weather-view/WeatherViewContainer';
import ForecastViewContainer from '../forecast-view/ForecastViewContainer';

export interface Props {
    cityId: number;
    weather: Weather | null;
}

export interface State {

}

class FavoriteCityView extends React.PureComponent<Props, State> {
    render() {
        const { cityId } = this.props;
        return (
            <React.Fragment>
                <div className="row justify-content-center">
                    <WeatherViewContainer cityId={cityId} />
                </div>
                <div className="row justify-content-center">
                    <ForecastViewContainer cityId={cityId} />
                </div>
            </React.Fragment>

        );
    }
}

export default FavoriteCityView;