import { Search, Trash } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { formatTimestamp } from '../utils/dataConversion';
import { Button } from '@headlessui/react';
import { getWeather } from '../api/weather';
import StateContext from '../context/StateContext';
import { useContext } from 'react';
import { WEATHER_KEY } from '../constants/constant';

// define SearchWidget props
type SearchWidgetProps = {
    data: WeatherData
    setCurrentWeather: (data: WeatherData) => void;
    setSearchedWeather: React.Dispatch<React.SetStateAction<WeatherData[]>>;
    removeWeatherData: (data: WeatherData) => void;
}

const SearchWidget = ({ data, setCurrentWeather, setSearchedWeather, removeWeatherData }: SearchWidgetProps) => {
    const { loading, setLoading, setErrorMsg } = useContext(StateContext);

    // Function to fetch and update the current weather data from the history
    const getCurrentWeatherFromHistory = async () => {
        const location = data.name; // get location name from data
        setLoading(true);

        try {
            // Fetch weather data based on the location
            const data = await getWeather({ location: location, type: 'search' });
            if(typeof data === 'string') {
                setErrorMsg(data);
                throw new Error('Please enter a valid city or country, please try again.');
            } else {
                // Update current and searched weather data and stored in localStorage
                setCurrentWeather(data);
                setSearchedWeather((prev: WeatherData[]) => {
                    const updatedWeather = [...prev, data];
                    localStorage.setItem(WEATHER_KEY, JSON.stringify(updatedWeather));
                    return updatedWeather;
                });
                setErrorMsg("");
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#e5daf5] dark:bg-[#2b2443] opacity-90 p-3 rounded-xl flex items-center justify-between gap-3">
            <div className='xs:flex justify-between flex-1'>
                <p className="text-black dark:text-white text-sm font-medium select-none">{`${data.name}, ${data.sys.country}`}</p>
                <p className="text-black dark:text-gray-400 text-sm select-none">{`${formatTimestamp(data.dt)}`}</p>
            </div>
            <div className="flex space-x-2">
                <Button
                    className='border bg-white dark:bg-transparent border-[#e5daf5] dark:border-gray-400 rounded-full p-2 group-hover:text-gray-900 dark:hover:border-gray-100 group'
                    onClick={getCurrentWeatherFromHistory}
                    disabled={loading}
                >
                    <Search size={20} className='text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100'/>
                </Button>
                <Button
                    className='border bg-white dark:bg-transparent border-[#e5daf5] dark:border-gray-400 rounded-full p-2 group-hover:text-gray-900 dark:group-hover:text-gray-100 group'
                    onClick={() => removeWeatherData(data)}
                >
                    <Trash size={20} className='text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100'/>
                </Button>
            </div>
        </div>
    )
}

export default SearchWidget