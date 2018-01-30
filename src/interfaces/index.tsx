export interface ApplicationState {
    location: Location;
    weatherData: WeatherData;
    forecastData: ForecastData;
    favoriteCities: number[];
}

export interface WeatherData {
    weather: Weather | null;
    fetching: boolean;
    error: string | null;
}
export interface ForecastData {
    forecast: Forecast | null;
    fetching: boolean;
    error: string | null;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface WeatherResponse{
    coord: {lat: number; lon: number};
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
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

export interface ForecastResponse {
    code: string;
    message: number;
    city: {
        id: number;
        name: string;
        coord: {lat: number; lon: number};
        country: string;
    };
    cnt: number;
    list: Array<{
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
    }>;
}

export interface Location {
    id?: number;
    name: string;
    countryCode: string;
    coordinates: Coordinates;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
    params: WeatherParams;
    wind: Wind;
    clouds: {
        all: number;
    };
    location: Location;
}

export interface ForecastItem {
    timestamp: number;
    weather: Weather;
}

export interface Forecast {
    location: Location;
    list: ForecastItem[];
}
export interface Wind {
    speed: number;
    deg: number;
}

export interface WeatherParams {
    temperature: number;
    temperatureMin: number;
    temperatureMax: number;
    pressure: number;
    humidity: number;
}
