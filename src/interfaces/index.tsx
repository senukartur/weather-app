export interface ApplicationState {
    coordinates: Coordinates;
    currentWeatherData: WeatherData;
    favoriteCities: number[];
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