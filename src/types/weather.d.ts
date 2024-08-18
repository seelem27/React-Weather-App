/*
 * Main weather data types
*/
export interface WeatherMain {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
}

/*
 * Weather system data types.
*/
export interface WeatherSys {
    country: string;
    sunrise: number;
    sunset: number;
}

/*
 * Restructure Main weather and Weather system data into one
*/
export interface WeatherData {
    id: string;
    main: WeatherMain;
    sys: WeatherSys;
    dt: number;
    weather: {
        main: string;
    }[];
    name: string;
}