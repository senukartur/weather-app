import * as interfaces from '../interfaces';
import { GetWeatherData } from '../actions/weather';
import * as constants from '../constants';

type Action = GetWeatherData;
const defaultWeatherData: interfaces.WeatherData = {
    coord: {
        lat: 0,
        lon: 0
    },
    weather: [{
        id: 0,
        main: '',
        description: '',
        icon: ''
    }],
    base: '',
    main: {
        temp: 0,
        pressure: 0,
        humidity: 0,
        temp_min: 0,
        temp_max: 0
    },
    wind: {
        speed: 0,
        deg: 0
    },
    clouds: {
        all: 0
    },
    rain: {
        h: 0,
    },
    dt: 0,
    sys: {
        type: 0,
        id: 0,
        message: 0,
        country: '',
        sunrise: 0,
        sunset: 0
    },
    id: 0,
    name: '',
    cod: 0
};

function currentWeatherData(state: interfaces.WeatherData = defaultWeatherData, action: Action ) {
    switch (action.type) {
        case constants.GET_WEATHER_DATA_SUCCESS:
            return action.currentWeather;
        case constants.GET_WEATHER_DATA_FAILED:
            return state;
        default:
            return state;
    }
}

export default currentWeatherData;