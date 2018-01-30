import { WeatherResponse, Weather, ForecastResponse, Forecast, ForecastItem } from '../interfaces';

export function weatherResponseToData(weatherResponse: WeatherResponse): Weather {
    return {
        id: weatherResponse.weather[0].id,
        main: weatherResponse.weather[0].main,
        description: weatherResponse.weather[0].description,
        icon: weatherResponse.weather[0].icon,
        params: {
            temperature: weatherResponse.main.temp,
            temperatureMax: weatherResponse.main.temp_max,
            temperatureMin: weatherResponse.main.temp_min,
            pressure: weatherResponse.main.pressure,
            humidity: weatherResponse.main.humidity
        },
        wind: weatherResponse.wind,
        clouds: weatherResponse.clouds,
        location: {
            id: weatherResponse.id,
            name: weatherResponse.name,
            countryCode: weatherResponse.sys.country,
            coordinates: {
                longitude: weatherResponse.coord.lon,
                latitude: weatherResponse.coord.lat,
            }
        }
    } as Weather;
}

export function forecastResponseToData(forecastResponse: ForecastResponse): Forecast {
    let forecastItems: ForecastItem[] = forecastResponse.list.map(item => {
        return {
            timestamp: item.dt,
            weather: {
                id: item.weather[0].id,
                main: item.weather[0].main,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                params: {
                    temperature: item.main.temp,
                    temperatureMax: item.main.temp_max,
                    temperatureMin: item.main.temp_min,
                    pressure: item.main.pressure,
                    humidity: item.main.humidity
                },
                wind: item.wind,
                clouds: item.clouds,
                location: {
                    id: forecastResponse.city.id,
                    name: forecastResponse.city.name,
                    countryCode: forecastResponse.city.country,
                    coordinates: {
                        longitude: forecastResponse.city.coord.lon,
                        latitude: forecastResponse.city.coord.lat,
                    }
                }
            }
        } as ForecastItem;
    });

    return {
        location: {
            id: forecastResponse.city.id,
            name: forecastResponse.city.name,
            countryCode: forecastResponse.city.country,
            coordinates: {
                longitude: forecastResponse.city.coord.lon,
                latitude: forecastResponse.city.coord.lat,
            }
        },
        list: forecastItems
    } as Forecast;
}