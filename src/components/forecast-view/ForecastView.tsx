import * as React from 'react';
import { ForecastData } from '../../interfaces';
import WeatherIcon from '../weather-icon/WeatherIcon';

import './forecast-view.css';
import Temperature from '../temperature/Temperature';

export interface Props {
    forecast: ForecastData | null;
}

const ForecastView: React.SFC<Props> = ({ forecast }) => {
    return (
        <div className={'forecast-view-container'}>
            {forecast ? forecast.list.map((f, i) => {
                if (i % 8 === 0) {
                    return (
                        <div className={'forecast-item'} key={i}>
                            <WeatherIcon iconId={f.weather[0].id} className={'forecast-weather-icon'}/>
                            <Temperature temperature={f.main.temp} className={'forecast-temperature'}/>
                        </div>
                    );

                } else {
                    return '';
                }
            }) : ''}
        </div>
    );
};

export default ForecastView;