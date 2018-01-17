export interface ApplicationState {
    coordinates: Coordinates;
    location: Location;
    currentWeatherData: WeatherData | null;
    currentForecastData: ForecastData | null;
    favoriteCities: number[];
    errorMessage: string;
}

export interface Location {
    city: string;
    countryCode: string;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherData {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    rain: {
        h: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        message: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    id: number;
    name: string;
    cod: number;
}

export interface Forecast {
    dt: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: Weather[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    dt_txt: string;
}

export interface ForecastData {
    code: string;
    message: number;
    city: {
        id: number;
        name: string;
        coordinates: Coordinates;
    };
    cnt: number;
    list: Forecast[];
}
