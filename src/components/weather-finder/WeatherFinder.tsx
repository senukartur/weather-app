import * as React from 'react';
import { Coordinates, Location } from '../../interfaces';
import CoordinatesForm from '../coordinates-form/CoordinatesForm';
import LocationFrom from '../location-form/LocationForm';

import './weather-finder.css';

export interface Props {
    location: Location;
    onSetLocation: (location: Location) => void;
    onFetchWeatherByLocation: () => void;
    onFetchWeatherByCoordinates: () => void;
}

class WeatherFinder extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    handleFetchWeatherByLocation = (city: string, countryCode: string) => {
        this.props.onSetLocation({
            name: city,
            countryCode: countryCode,
            coordinates: {
                latitude: 0,
                longitude: 0
            }
        });

        this.props.onFetchWeatherByLocation();
    }

    handleFetchWeatherByCoordinates = (coordinates: Coordinates) => {
        this.props.onSetLocation({
            name: '',
            countryCode: '',
            coordinates: coordinates
        });

        this.props.onFetchWeatherByCoordinates();
    }

    render() {
        const { countryCode, name, coordinates } = this.props.location;
        return (
            <div className="col-lg-6 col-sm-10">
                <LocationFrom
                    name={name}
                    countryCode={countryCode}
                    onSubmit={this.handleFetchWeatherByLocation}
                />

                <div className="divider">
                    <div className="divider-text">or</div>
                </div>

                <CoordinatesForm
                    onSubmit={this.handleFetchWeatherByCoordinates}
                    coordinates={coordinates}
                />
            </div>
        );
    }
}

export default WeatherFinder;