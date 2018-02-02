import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import CountryAutocompleteField , { Country, CountryAutocompleteField as CountryAutocompleteFieldComponent }
    from '../country-autocomplete-field/CountryAutocompleteField';

import './location-form.css';

export interface Props {
    name: string;
    countryCode: string;
    onSubmit: (city: string, countryCode: string) => void;
}

export interface State {
    city: string;
    countryCode: string;
    isCityValid: boolean;
    isCountryValid: boolean;
}

class LocationForm extends React.PureComponent<Props, State> {
    private refCountryAutocompleteField: CountryAutocompleteFieldComponent;

    constructor(props: Props) {
        super(props);

        this.state = {
            city: props.name,
            countryCode: props.countryCode,
            isCityValid: true,
            isCountryValid: true
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        const { name , countryCode } = nextProps;

        this.setState({
            city: name,
            countryCode
        });

        this.refCountryAutocompleteField.updateCountry(countryCode);
    }

    getCountryAutocompleteFieldRef = (ref: CountryAutocompleteFieldComponent) => this.refCountryAutocompleteField = ref;

    handleChangeCity = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            city: event.currentTarget.value,
            isCityValid: true
        });
    }

    handleSelectCountry = (country: Country) => this.setState({countryCode: country.code});

    handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ isCountryValid: true });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { city, countryCode } = this.state;
        if (city && countryCode) {

            this.props.onSubmit(city, countryCode);

            this.setState({isCityValid: true, isCountryValid: true});
        } else {
            this.setState({isCityValid: !!city, isCountryValid: !!countryCode});
        }
    }

    render() {
        const { city, countryCode, isCityValid, isCountryValid } = this.state;

        return (
            <form
                className="row no-gutters weather-finder-location-form"
                onSubmit={this.handleSubmit}
            >
                <TextField
                    className="col-sm-5 city-field"
                    type="text"
                    value={city}
                    label="City"
                    error={!isCityValid}
                    helperText={!isCityValid ? 'City must be required.' : ''}
                    onChange={this.handleChangeCity}
                />

                <div className="col-sm-5 country-field-container" >
                    <CountryAutocompleteField
                        className="country-field"
                        countryCode={countryCode}
                        onSelect={this.handleSelectCountry}
                        onChange={this.handleChangeCountry}
                        error={!isCountryValid}
                        errorMessage={'Country must be required.'}
                        innerRef={this.getCountryAutocompleteFieldRef}
                    />
                </div>

                <div className="col-sm-2 get-weather-button-container" >
                    <Button
                        type="submit"
                        className="btn get-weather-button"
                        color="primary"
                        raised={true}
                    >
                        Get
                    </ Button>
                </div>
            </form>
        );
    }
}

export default LocationForm;