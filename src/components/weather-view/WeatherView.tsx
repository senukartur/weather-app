import * as React from 'react';
import { Weather } from '../../ducks';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Temperature from '../temperature/Temperature';
import WeatherInfo from '../weather-info/WeatherInfo';
import WeatherIcon from '../weather-icon/WeatherIcon';
import WeatherParams from '../weather-params/WeatherParams';
import FavoriteButton from '../favorite-button/FavoriteButton';

import './weather-view.css';

export interface Props {
    cityId: number;
    weather: Weather | null;
    isFavorite: boolean;
    fetchingWeather: boolean;
    addToFavorite: (cityId: number) => void;
    removeFromFavorite: (cityId: number) => void;
}

class WeatherView extends React.PureComponent<Props, {}> {

    handleAddToFavorite = () => {
        const { weather } = this.props;
        const cityId: number = weather ? weather.location.id : 0;
        this.props.addToFavorite(cityId);
    }

    handleRemoveFromFavorite = () => {
        const { weather } = this.props;
        const cityId: number = weather ? weather.location.id : 0;
        this.props.removeFromFavorite(cityId);
    }

    renderWeather = (weather: Weather) => {
        return (
            <React.Fragment>
                <div className="row justify-content-end favorite-button-container">
                    <FavoriteButton
                        className="favorite-button"
                        isFavorite={this.props.isFavorite}
                        onAddToFavorite={this.handleAddToFavorite}
                        onRemoveFromFavorite={this.handleRemoveFromFavorite}
                    />
                </div>
                <div className="row no-gutters weather-info">
                    <Temperature
                        temperature={weather.params.temperature}
                        className="col-4 weather-view-temperature"
                    />
                    <WeatherInfo
                        className="col-4"
                        city={weather.location.name}
                        countryCode={weather.location.countryCode}
                        weatherDescription={weather.description}
                    />
                    <WeatherIcon iconId={weather.id} className="col-4 weather-view-icon" />
                </div>
                <div className="row justify-content-sm-center no-gutters text-center">
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
        const { weather, fetchingWeather } = this.props;
        return (
            <div className="col-lg-6 col-sm-10 weather-view-container">
                <Paper>
                    {
                        fetchingWeather ? this.renderLoader() :
                        weather ? this.renderWeather(weather) :
                            <p className="text-center">You can get weather by location or coordinates.</p>
                    }
                </Paper>
            </div>
        );
    }
}

export default WeatherView;