import { useContext, useEffect, useState } from 'react';
import cloudImage from '../assets/weather/cloud.png';
import notAvailable from '../assets/weather/na.png';
import sunnyImage from '../assets/weather/sun.png';
import { WeatherData } from '../types/weather';
import { kelvinToCelsius } from '../utils/dataConversion';
import { getDayOrNight } from '../utils/getLocationUtils';
import SearchWidget from './SearchWidget';
import { WEATHER_KEY } from '../constants/constant';
import StateContext from '../context/StateContext';
import WeatherInfoSkeleton from './skeletons/WeatherInfoSkeleton';

// define weatherInfo props
type WeatherInfoProps = {
    currentWeather: WeatherData | undefined;
    setCurrentWeather: (data: WeatherData) => void;
    searchedWeather: WeatherData[];
    setSearchedWeather: React.Dispatch<React.SetStateAction<WeatherData[]>>;
}

const WeatherInfo = ({ currentWeather, setCurrentWeather, searchedWeather, setSearchedWeather }: WeatherInfoProps) => {
    const { loading, errorMsg } = useContext(StateContext);
    const [dayOrNight, setDayOrNight] = useState<string>('');

    // Function to remove weather data from the search history
    const removeWeatherData = (weatherData: WeatherData) => {
        const updatedWeather = searchedWeather.filter(data => data.id !== weatherData.id);
        setSearchedWeather(updatedWeather);
        localStorage.setItem(WEATHER_KEY, JSON.stringify(updatedWeather));
    };

    // determine if its day or night based on current weather data
    useEffect(() => {
        if (currentWeather?.sys !== undefined) {
            const period = getDayOrNight(currentWeather.dt, currentWeather.sys.sunrise, currentWeather.sys.sunset);
            setDayOrNight(period);
        }
    }, [currentWeather]);

    return (
        <>
            { errorMsg !== '' && (
                <div className="border border-red-500 py-2 px-4 bg-gradient-to-r from-[#cbb1ea] to-[#b6a0e5] dark:from-[#533994] dark:to-[#3e3086] rounded-xl w-2/3">
                    <h2 className="text-md font-bold text-black dark:text-white">There is a problem!</h2>
                    <p className="text-red-600 dark:text-red-500 text-sm mt-2">
                        {errorMsg}
                    </p>
                </div>
            )}
            <div className="bg-gradient-to-r from-[#cbb1ea] to-[#b6a0e5] dark:from-[#533994] dark:to-[#3e3086] p-6 rounded-3xl shadow-lg w-full min-h-[78vh] mt-24 xs:mt-10 relative">
                    { loading ? (
                        <WeatherInfoSkeleton />
                    ) : (
                        <>
                            <div className="flex flex-row items-end">
                                <div className='w-full xs:w-1/2'>
                                    <p className='text-black dark:text-white text-sm select-none'>Today's Weather</p>

                                    {/* main temp */}
                                    {currentWeather?.main?.temp !== undefined
                                        ? <h2 className="text-6xl xs:text-7xl font-bold text-[#6c40b5] dark:text-white select-none">{`${kelvinToCelsius(currentWeather.main.temp)} °`}</h2>
                                        : <h2 className="text-4xl font-bold text-black dark:text-white select-none">N/A</h2>
                                    }

                                    {/* high and low temp */}
                                    <p className="text-sm text-black dark:text-white select-none">
                                        H: {currentWeather?.main?.temp_max !== undefined
                                            ? `${kelvinToCelsius(currentWeather.main.temp_max)} °`
                                            : "N/A "}
                                        L: {currentWeather?.main?.temp_min !== undefined
                                            ? `${kelvinToCelsius(currentWeather.main.temp_min)} °`
                                            : " N/A"}
                                    </p>

                                    {/* location */}
                                    <p className="text-sm text-black dark:text-white font-bold select-none">
                                        {currentWeather?.name !== undefined && currentWeather?.sys?.country !== undefined
                                            ? `${currentWeather.name}, ${currentWeather.sys.country}`
                                            : "Location: N/A"}
                                    </p>
                                </div>

                                <div className='flex flex-col-reverse xs:flex-row mt-2 justify-between w-full gap-2 text-right xs:text-center'>
                                    {/* date time */}
                                    <p className="text-sm text-black dark:text-white select-none">
                                        {currentWeather?.dt !== undefined
                                            ? new Date(currentWeather.dt * 1000).toLocaleString()
                                            : "Date/Time: N/A"}
                                    </p>

                                    {/* humidity */}
                                    <p className='text-sm text-black dark:text-white select-none'>
                                        Humidity: {currentWeather?.main?.humidity !== undefined
                                            ? `${currentWeather.main.humidity}%`
                                            : "N/A"}
                                    </p>

                                    {/* Weather status */}
                                    <p className='text-sm text-black dark:text-white select-none'>
                                        {currentWeather?.weather?.[0]?.main !== undefined
                                            ? currentWeather.weather[0].main
                                            : "Weather: N/A"}
                                    </p>
                                </div>
                            </div>
                            { currentWeather?.sys !== undefined ? (
                                <img src={dayOrNight === 'Day' ? sunnyImage : cloudImage} alt="Cloud" className="w-52 h-52 top-[-15%] right-3 xs:w-56 xs:h-56 absolute xs:top-[-10%] xs:right-3 select-none" draggable="false" />
                            ) : <img src={notAvailable} alt="Not available" className="w-52 h-52 top-[-16%] right-3 xs:w-56 xs:h-56 absolute xs:top-[-14%] xs:right-0 select-none" draggable="false" />}
                        </>
                    )}

                <div className="mt-6 rounded-2xl bg-[#d4c0ee] dark:bg-[#3a2c6a] py-6 px-6 max-h-[55vh] select-none overflow-y-auto scroll-smooth">
                    { searchedWeather.length === 0 ? (
                        <div>
                            <h1 className='text-black dark:text-white'>No record found</h1>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-md font-normal text-black dark:text-white select-none">Search History</h3>
                            { searchedWeather.slice().reverse().map((data, index) => (
                                <SearchWidget
                                    key={index} data={data} setCurrentWeather={setCurrentWeather}
                                    setSearchedWeather={setSearchedWeather} removeWeatherData={removeWeatherData}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default WeatherInfo