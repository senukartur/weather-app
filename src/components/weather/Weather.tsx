import * as React from 'react';
import { WeatherData } from '../../interfaces';
import Temperature from '../temperature/Temperature';
import WeatherInfo from '../weather-info/WeatherInfo';
import WeatherIcon from '../weather-icon/WeatherIcon';

export interface Props {
    weather: WeatherData;
    onGetCurrentUserCoordinates: () => void;
}

class Weather extends React.PureComponent<Props, {}> {

    render() {
        return (
            <div className={'container'}>
                <h3>Weather</h3>
                <Temperature temperature={this.props.weather.main.temp} />
                <WeatherInfo
                    city={this.props.weather.name}
                    countryCode={this.props.weather.sys.country}
                    weatherDescription={this.props.weather.weather[0].description}
                />
                <WeatherIcon iconId={this.props.weather.weather[0].id}/>

                <button onClick={this.props.onGetCurrentUserCoordinates}>test</button>
            </div>
        );
    }
}

export default Weather;