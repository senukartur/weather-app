import * as React from 'react';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui//Tooltip';
import Button from 'material-ui/Button';
import { Coordinates } from '../../interfaces';

import './coordinates-form.css';

export interface Props {
    coordinates: Coordinates;
    onSubmit: (coordinates: Coordinates) => void;
}

export interface State {
    coordinates: Coordinates;
    gettingUserCoordinates: boolean;
    errorMessage: string;
}

class CoordinatesForm extends React.PureComponent<Props, State> {
    constructor(props: Props) {

        super(props);

        this.state = {
            coordinates: props.coordinates,
            gettingUserCoordinates: false,
            errorMessage: ''
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        const { latitude, longitude } = nextProps.coordinates;

        this.setState({
            coordinates: {
                latitude: parseFloat(latitude.toFixed(2)),
                longitude: parseFloat(longitude.toFixed(2))
            }
        });
    }

    handleChangeLatitude = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            coordinates: {
                latitude: parseFloat(parseFloat(event.currentTarget.value).toFixed(2)),
                longitude: this.state.coordinates.longitude
            }
        });
    }

    handleChangeLongitude = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            coordinates: {
                latitude: this.state.coordinates.latitude,
                longitude: parseFloat(parseFloat(event.currentTarget.value).toFixed(2))
            }
        });
    }

    handleGetUserCoordinates = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        this.setState({gettingUserCoordinates: true});

        const successCallback = async (position: Position) => {
            let coordinates: Coordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            this.setState({ gettingUserCoordinates: false, coordinates });
        };

        const errorCallback = (positionError: PositionError) => {
            this.setState({
                errorMessage: 'We can\'t get your coordinates because you denied it.',
                gettingUserCoordinates: false
            });
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { coordinates } = this.state;
        this.props.onSubmit(coordinates);
    }

    render() {
        const { coordinates, errorMessage, gettingUserCoordinates } = this.state;

        return (
            <form
                className="row no-gutters weather-finder-coordinates-form"
                onSubmit={this.handleSubmit}
            >
                <div className="col-sm-9">
                    <TextField
                        type="number"
                        className="latitude-field"
                        value={coordinates.latitude}
                        label="Latitude"
                        onChange={this.handleChangeLatitude}
                    />

                    <TextField
                        type="number"
                        value={coordinates.longitude}
                        label="Longitude"
                        className="longitude-field"
                        onChange={this.handleChangeLongitude}
                    />
                </div>

                <div className="col-sm-3 detect-coordinates-button-container" >
                    <Tooltip title="Click for getting your current coordinates." placement="top">
                        <button
                            className="btn btn-outline-secondary detect-coordinates-button"
                            onClick={this.handleGetUserCoordinates}
                        >
                            <i
                                className={'fa ' + (!gettingUserCoordinates ?
                                    'fa-crosshairs' : 'fa-spinner fa-spin')}
                            />
                        </ button>
                    </Tooltip>

                    <Button
                        type="submit"
                        className="btn get-weather-button"
                        color="primary"
                        raised={true}
                    >
                        Get
                    </ Button>
                </div>
                <p className="text-center text-danger">{errorMessage}</p>
            </form>
        );
    }
}

export default CoordinatesForm;