import * as React from 'react';
import * as moment from 'moment';
import Paper from 'material-ui/Paper';
import WeatherIcon from '../weather-icon/WeatherIcon';
import Temperature from '../temperature/Temperature';
import { ForecastItem } from '../../interfaces';

export interface Props {
    forecast: ForecastItem;
    className?: string;
}

const ForecastItem: React.SFC<Props> = ({ forecast, className }) => {
    return (
        <div className="col-sm forecast-item">
            <Paper className={''}>
                <p className="text-center font-weight-light">{moment(forecast.timestamp * 1000).format('DD ddd')}</p>
                <WeatherIcon iconId={forecast.weather.id} className="forecast-weather-icon"/>
                <Temperature
                    temperature={forecast.weather.params.temperature}
                    className="forecast-temperature"
                />
            </Paper>
        </div>
    );
};

export default ForecastItem;