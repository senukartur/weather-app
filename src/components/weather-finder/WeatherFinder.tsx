import * as React from 'react';
import TextField from 'material-ui/TextField';
import { Coordinates, Location } from '../../interfaces';
import Button from '../button/Button';
import ReactFlagsSelect from 'react-flags-select';

import './weather-finder.css';

export interface Props {
    coordinates: Coordinates;
    location: Location;
    handleCurrentUserCoordinates: () => void;
    handleCustomCoordinates: (coordinates: Coordinates) => void;
    handleCustomLocation: (location: Location) => void;
}

export interface State {
    city: string;
    countryCode: string;
    coordinates: Coordinates;
    isCityValid: boolean;
}

class WeatherFinder extends React.PureComponent<Props, State> {
    private reactFlagSelect: ReactFlagsSelect;

    constructor(props: Props) {
        super(props);

        this.state = {
            city: '',
            countryCode: 'US',
            coordinates: {
                lat: 0,
                lon: 0
            },
            isCityValid: true
        };

        this.handleChangeLatitude = this.handleChangeLatitude.bind(this);
        this.handleChangeLongitude = this.handleChangeLongitude.bind(this);
        this.handleSubmitCoordinates = this.handleSubmitCoordinates.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCountryCode = this.handleChangeCountryCode.bind(this);
        this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            coordinates: {
                lat: nextProps.coordinates.lat,
                lon: nextProps.coordinates.lon
            },
            city: nextProps.location.city,
            countryCode: nextProps.location.countryCode
        });

        this.reactFlagSelect.updateSelected(nextProps.location.countryCode);
    }

    handleChangeCity(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            city: event.currentTarget.value
        });
    }

    handleChangeCountryCode(countryCode: string) {
        this.setState({
            countryCode
        });
    }

    handleSubmitLocation(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (this.state.city !== '') {
            this.setState({
                isCityValid: true
            });

            this.props.handleCustomLocation({
                city: this.state.city,
                countryCode: this.state.countryCode
            });
        } else {
            this.setState({
                isCityValid: false
            });
        }
    }

    handleChangeLatitude(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            coordinates: {
                lat: parseFloat(event.currentTarget.value),
                lon: this.state.coordinates.lon
            }
        });
    }

    handleChangeLongitude(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            coordinates: {
                lat: this.state.coordinates.lat,
                lon: parseFloat(event.currentTarget.value)
            }
        });
    }

    handleSubmitCoordinates(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {lon, lat} = this.state.coordinates;
        if (lon !== 0 && lat !== 0) {
            this.props.handleCustomCoordinates({
                lon: lon,
                lat: lat
            });
        }
    }

    render() {
        const { city, coordinates, isCityValid } = this.state;

        return (
            <div className={'weather-finder-container'}>
                <form className={'location-form'} onSubmit={this.handleSubmitLocation}>
                    <TextField
                        type="text"
                        value={city}
                        label={'City'}
                        error={!isCityValid}
                        helperText={!isCityValid ? 'City name must be required.' : ''}
                        onChange={this.handleChangeCity}
                    />

                    <ReactFlagsSelect
                        onSelect={this.handleChangeCountryCode}
                        defaultCountry="US"
                        searchable={true}
                        ref={(ref: ReactFlagsSelect) => this.reactFlagSelect = ref}
                    />

                    <input type="submit" value="Submit" />
                </form>

                <form className={'coordinates-form'} onSubmit={this.handleSubmitCoordinates}>
                    <TextField
                        type="number"
                        value={coordinates.lat.toFixed(4)}
                        label={'Latitude'}
                        onChange={this.handleChangeLatitude}
                    />
                    <TextField
                        type="number"
                        value={coordinates.lon.toFixed(4)}
                        label={'Longitude'}
                        onChange={this.handleChangeLongitude}
                    />
                    <Button onClick={this.props.handleCurrentUserCoordinates} >
                        <i className={'fa fa-crosshairs'} aria-hidden="true"></i>
                    </Button>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default WeatherFinder;