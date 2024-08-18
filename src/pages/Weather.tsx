import MaxWidthWrapper from '../components/MaxWidthWrapper'
import Header from '../components/Header'
import WeatherInfo from '../components/WeatherInfo'
import { useContext, useEffect, useState } from 'react'
import { getLocation } from '../utils/getLocationUtils'
import { getWeather } from '../api/weather'
import { WeatherData } from '../types/weather'
import { WEATHER_KEY } from '../constants/constant'
import StateContext from '../context/StateContext'

const Weather = () => {
    const { setLoading, setErrorMsg } = useContext(StateContext);

    const [currentWeather, setCurrentWeather] = useState<WeatherData | undefined>(undefined);
    const [searchedWeather, setSearchedWeather] = useState<WeatherData[]>([]);

    // Run on initial load to get user current location.
    useEffect(() => {
        //get weather data
        const handleWeatherData = async (latitude: number, longitude: number) => {
            try {
                const data = await getWeather({ latitude: latitude, longitude: longitude });
                if (typeof data === 'string') {
                    setErrorMsg('Failed to fetch weather data');
                } else {
                    setCurrentWeather(data);
                }
            } catch (error) {
                console.log('Error fetching weather data', error);
                setErrorMsg('Failed to fetch weather data');
            }
        };

        //get weather info from current location
        getLocation((latitude: number, longitude: number) => {
            setLoading(true);
            handleWeatherData(latitude, longitude);
            setLoading(false);
        }, (error) => {
            setErrorMsg(error.message);
            setLoading(false);
        });

        //check if localStorage exists
        const savedWeather = localStorage.getItem(WEATHER_KEY);

        /*
         check localStorage contain weather data,
         set its value to setSearchWeather state or return error
        */
        if(savedWeather) {
            try {
                const parsedWeather: WeatherData[] = JSON.parse(savedWeather);
                setSearchedWeather(parsedWeather);
            } catch (error) {
                console.log('Error parsing weather data from localStorage', error);
            }
        }
    }, []);

    return (
        <MaxWidthWrapper>
            <Header
                setCurrentWeather={setCurrentWeather}
                setSearchedWeather={setSearchedWeather}
            />
            <WeatherInfo
                currentWeather={currentWeather}
                setCurrentWeather={setCurrentWeather}
                searchedWeather={searchedWeather}
                setSearchedWeather={setSearchedWeather}
            />
        </MaxWidthWrapper>
    )
}

export default Weather