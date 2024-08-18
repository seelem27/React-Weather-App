import { WeatherData } from "../types/weather";

// Retrieve from environment variables
const base_url = import.meta.env.VITE_BASE_URL;
const api_key = import.meta.env.VITE_API_KEY;

// define options that can be passed to getWeather function
interface GetWeatherOptions {
    location?: string;
    latitude?: number;
    longitude?: number;
    type?: string;
}

// Generate a unique id based on the timestamp and a random value
const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

// fetch bassed on provided options
export const getWeather = async (options: GetWeatherOptions = {}): Promise<WeatherData | string> => {
    const { location, latitude, longitude, type = 'current' } = options;

    let url: string = '';
    try {
        // Construct the URL based on the request type
        if(type === 'search') {
            url = `${base_url}/?q=${location}&appid=${api_key}`;
        } else if(type === 'current') {
            url = `${base_url}/?lat=${latitude}&lon=${longitude}&appid=${api_key}`
        } else {
            throw new Error('Missing location or coordinates');
        }

        // Fetch the weather data
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('Opps! Location not found. Please enter a valid city or country.');
        }

        // Parse the JSON response
        const data = await response.json();
        const {
            main: { temp, temp_max, temp_min, humidity },
            sys: { country, sunrise, sunset },
            dt, weather, name
        } = data;

        // Return the structured weather data
        return {
            id: generateId(),
            main: { temp, temp_max, temp_min, humidity },
            sys: { country, sunrise, sunset },
            dt, weather, name
        };

    } catch (error) {
        // Return error message if an exception occurs
        if(error instanceof Error) {
            return error.message
        } else {
            return 'There seems to be a problem getting weather info, please try again.';
        }
    }
}