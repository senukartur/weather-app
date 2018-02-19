import * as React from 'react';

import WeatherViewContainer from '../weather-view';
import WeatherFinderContainer from '../weather-finder';
import ForecastViewContainer from '../forecast-view';

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