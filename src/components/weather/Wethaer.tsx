import * as React from 'react';

import WeatherViewContainer from '../weather-view/WeatherViewContainer';
import WeatherFinderContainer from '../weather-finder/WeatherFinderContainer';
import ForecastViewContainer from '../forecast-view/ForecastViewContainer';

export interface Props {
    cityId: number;
}

const Weather: React.SFC<Props> = ({ cityId }) => {
    return (
        <React.Fragment>
            <div className="row justify-content-center">
                <WeatherViewContainer cityId={cityId} />
            </div>
            <div className="row justify-content-center">
                <ForecastViewContainer cityId={cityId} />
            </div>
            <div className="row justify-content-center">
                <WeatherFinderContainer />
            </div>
        </React.Fragment>

    );
};
export default Weather;