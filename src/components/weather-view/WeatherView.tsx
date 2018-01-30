import * as React from 'react';
import { Weather, WeatherData } from '../../interfaces';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Temperature from '../temperature/Temperature';
import WeatherInfo from '../weather-info/WeatherInfo';
import WeatherIcon from '../weather-icon/WeatherIcon';
import WeatherParams from '../weather-params/WeatherParams';

import './weather-view.css';

export interface Props {
    weatherData: WeatherData;
}

class WeatherView extends React.PureComponent<Props, {}> {

    renderWeather = (weather: Weather) => {
        return (
            <React.Fragment>
                <div className="row weather-info">
                    <Temperature
                        temperature={weather.params.temperature}
                        className="col-sm-4 weather-view-temperature"
                    />
                    <WeatherInfo
                        className="col-sm-4"
                        city={weather.location.name}
                        countryCode={weather.location.countryCode}
                        weatherDescription={weather.description}
                    />
                    <WeatherIcon iconId={weather.id} className="col-sm-4 weather-view-icon" />
                </div>
                <div className="row justify-content-sm-center text-center">
                    <WeatherParams wind={weather.wind} weatherParams={weather.params} />
                </div>
            </React.Fragment>
            );
    }
    renderLoader = () => {
        return (
            <div className="row justify-content-center">
                <CircularProgress className="text-center" color={'primary'} />
            </div>
        );
    }

    render() {
        const { weather, fetching, error } = this.props.weatherData;
        return (
            <div className="col-lg-6 col-sm-10 weather-view-container">
                <Paper>
                    <Typography type="headline" component="h3" className="text-center">Weather</Typography>

                    {fetching ? this.renderLoader() :
                        error ? <p className="text-center text-danger">{error}</p> :
                            weather ? this.renderWeather(weather) :
                                <p className="text-center">You can get weather by location or coordinates.</p>}
                </Paper>
            </div>
        );
    }
}

export default WeatherView;