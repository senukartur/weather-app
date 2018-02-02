import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';
import countries from './countries.js';

import './country-autocomplete-field.css';

export interface Country {
    code: string;
    name: string;
}

const styles = (theme: Theme) => ({
    container: {
        flexGrow: 1,
        position: 'relative' as 'relative',
        zIndex: 1000
    },
    suggestionsContainerOpen: {
        position: 'absolute' as 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        top: theme.spacing.unit * 6
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    textField: {
        width: '100%'
    },
});

type Props  = {
    className?: string;
    countryCode?: string;
    placeholder?: string;
    defaultCountry?: string;
    autoFocus?: boolean;
    maxSuggestionsListLength?: number;
    error?: boolean;
    errorMessage?: string;
    onSelect?: (suggestion: Country) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setCountry?: (countryCode: string) => void;
};

type PropsWithStyle =
    Props & WithStyles<'container' | 'suggestionsContainerOpen' | 'suggestion' | 'suggestionsList' | 'textField'>;

interface State {
    value: string;
    country: Country;
    suggestions: Country[];
}

export class CountryAutocompleteField extends React.PureComponent<PropsWithStyle, State> {
    constructor(props: PropsWithStyle) {
        super(props);

        this.state = {
            value: '',
            country: {
                name: '',
                code: ''
            },
            suggestions: []
        };
    }

    componentWillMount() {
        const { defaultCountry, countryCode } = this.props;
        if (defaultCountry) {
            const items: Country[] = countries.filter(country => country.code === defaultCountry);
            if (items.length === 1) {
                this.setState({
                    value: items[0].name,
                    country: items[0]
                });
            }
        }
        if (countryCode) {
            const items: Country[] = countries.filter(country => country.code === countryCode);
            if (items.length === 1) {
                this.setState({
                    value: items[0].name,
                    country: items[0]
                });
            }
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: Autosuggest.ChangeEvent) => {
        this.setState({
            value: newValue
        });

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    handleSuggestionsFetchRequested = ({ value }: { value: string}) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    handleSuggestionSelect = (event: React.FormEvent<HTMLInputElement>,
                              data: Autosuggest.SuggestionSelectedEventData<Country>) => {
        if (this.props.onSelect) {
            this.props.onSelect(data.suggestion);
        }
    }

    renderSuggestion = (suggestion: Country, { query, isHighlighted }: Autosuggest.RenderSuggestionParams) => {
        const matches = match(suggestion.name, query);
        const parts = parse(suggestion.name, matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <img className="country-flag" src={`/images/flags/${suggestion.code.toLowerCase()}.svg`}/>
                <div>
                    {parts.map((part, index) => {
                        return part.highlight ? (
                            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
                        ) : (
                            <strong key={String(index)} style={{ fontWeight: 500 }}>
                                {part.text}
                            </strong>
                        );
                    })}
                </div>
            </MenuItem>
        );
    }

    getSuggestions = (value: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        const { maxSuggestionsListLength } = this.props;

        return inputLength === 0
            ? []
            : countries.filter(country => {

                const keep =
                    count < (maxSuggestionsListLength || 5 ) &&
                    country.name.toLowerCase().slice(0, inputLength) === inputValue;

                if (keep) {
                    count += 1;
                }
                return keep;
            });
    }

    getSuggestionValue = (suggestion: Country) => {
        return suggestion.name;
    }

    renderSuggestionsContainer = (options: Autosuggest.RenderSuggestionsContainerParams) => {
        const { containerProps, children } = options;

        return (
            <Paper {...containerProps} square={true}>
                {children}
            </Paper>
        );
    }

    renderInput = (inputProps: Autosuggest.InputProps<Country>) => {
        const {
            classes,
            autoFocus,
            autoComplete,
            value,
            ref,
            placeholder,
            onChange,
            onKeyDown,
            onFocus,
            type
        } = inputProps;

        const { error, errorMessage } = this.props;

        const items: Country[] = this.getSuggestions(value);

        const countryFlag: React.ReactNode =
            items.length === 1 ?
                <img className="country-flag selected" src={`/images/flags/${items[0].code.toLowerCase()}.svg`}/> :
                <span className="country-flag empty" />;

        return (
            <FormControl error={error} fullWidth={true}>
                <InputLabel className="autocomplete-input-label" htmlFor="country">{placeholder}</InputLabel>
                <Input
                    id="country"
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    type={type}
                    className={this.props.className ? this.props.className : classes.textField}
                    classes={{input: classes.input}}
                    value={value}
                    inputRef={ref}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    endAdornment={countryFlag}
                />
                <FormHelperText>{error ? errorMessage : ''}</FormHelperText>
            </FormControl>
        );
    }

    updateCountry = (code: string) => {
        const country: Country = countries.filter(c => c.code === code)[0];

        if (country) {
            this.setState({
                value: country.name,
                country: country
            });
        }
    }

    render() {
        const { classes, placeholder, autoFocus } = this.props;

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion
                }}
                renderInputComponent={this.renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={this.renderSuggestionsContainer}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.handleSuggestionSelect}
                inputProps={{
                    autoFocus: autoFocus || false,
                    classes,
                    placeholder: placeholder || 'Country',
                    value: this.state.value,
                    onChange: this.handleChange
                }}
            />
        );
    }
}

export default withStyles(styles)<Props>(CountryAutocompleteField);