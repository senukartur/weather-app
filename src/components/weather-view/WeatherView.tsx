import * as React from 'react';
import { WeatherData } from '../../interfaces';
import Temperature from '../temperature/Temperature';
import WeatherInfo from '../weather-info/WeatherInfo';
import WeatherIcon from '../weather-icon/WeatherIcon';

import './weather-view.css';

export interface Props {
    weather: WeatherData | null;
    errorMessage: string;
}

class WeatherView extends React.PureComponent<Props, {}> {

    renderWeather(weather: WeatherData) {
        return (
            <React.Fragment>
                <Temperature
                    temperature={weather.main.temp}
                    className={'weather-view-temperature'}
                />
                <WeatherInfo
                    city={weather.name}
                    countryCode={weather.sys.country}
                    weatherDescription={weather.weather[0].description}
                />
                <WeatherIcon iconId={weather.weather[0].id} className={'weather-view-icon'} />
            </React.Fragment>);
    }

    render() {
        const { weather, errorMessage } = this.props;
        return (
            <div className={'weather-view-container'}>
                <h3>Weather</h3>
                {weather ? this.renderWeather(weather) : 'You can get weather by location or coordinates.'}
                {errorMessage ? <p>{errorMessage}</p> : ''}
            </div>
        );
    }
}

export default WeatherView;