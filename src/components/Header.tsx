import { Button, Field, Input, Label } from '@headlessui/react'
import { Moon, Search, Sun } from 'lucide-react';
import { useContext, useState } from 'react';
import { getWeather } from '../api/weather';
import { WeatherData } from '../types/weather';
import { WEATHER_KEY } from '../constants/constant';
import ThemeContext from '../context/ThemeContext';
import StateContext from '../context/StateContext';

// define props for the Header component
type HeaderProps = {
    setCurrentWeather: (data: WeatherData) => void;
    setSearchedWeather: React.Dispatch<React.SetStateAction<WeatherData[]>>;
}

const Header = ({ setCurrentWeather, setSearchedWeather }: HeaderProps) => {
    // state from contextAPI
    const { darkTheme, setDarkTheme, saveThemeToLocalStorage } = useContext(ThemeContext);
    const { loading, setLoading, setErrorMsg } = useContext(StateContext);

    const [location, setLocation] = useState<string>("");

    const handleSearch = async () => {
        setLoading(true);
        try {
            const data = await getWeather({ location: location, type: 'search' });
            if(typeof data === 'string') {
                setErrorMsg(data);
                throw new Error('Please enter a valid city or country, please try again.');
            } else {
                // Update current and searched weather data
                setCurrentWeather(data);
                setSearchedWeather((prev: WeatherData[]) => {
                    const updatedWeather = [...prev, data];
                    localStorage.setItem(WEATHER_KEY, JSON.stringify(updatedWeather));
                    return updatedWeather;
                });

                //clear location and error message
                setLocation("");
                setErrorMsg("");
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Function to toggle between dark and light themes
    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
        saveThemeToLocalStorage(!darkTheme); // Save the new theme state to localStorage
    }

    return (
        <div className='h-20 flex items-center w-full'>
            <div className='w-full flex justify-between items-center gap-4'>
                <div className='flex gap-3 flex-1 max-w-lg'>
                    <Field className="relative flex-1">
                        <Input
                            className="text-black dark:text-gray-300 text-md pt-4 pb-2 px-3 w-full border border-gray-700/50 focus:outline-none focus:border-gray-700/50 peer rounded-2xl dark:bg-gray-900 dark:bg-opacity-60 bg-[#bda7e8]"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder=''
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            autoComplete='off'
                            disabled={loading}
                        />
                        <Label
                            className={
                                `absolute text-gray-500 dark:text-gray-400 text-xs left-3.5 transform transition-all duration-300 ${
                                location
                                    ? 'top-1 text-xs text-gray-500 dark:text-gray-400'
                                    : 'top-4 text-xs text-gray-500 dark:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-600 dark:peer-focus:text-gray-400'
                                }`
                            }
                        >
                            Country
                        </Label>
                    </Field>
                    <Button
                        className="text-white bg-[#6c40b5] dark:bg-[#28124d] font-medium rounded-2xl text-sm py-3 px-4 hover:bg-[#8068bc] dark:hover:bg-[#3e3086]"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        <Search size={20} />
                    </Button>
                </div>
                <div className="relative w-10 h-10 overflow-hidden">
                    <div className={`cursor-pointer absolute flex items-center justify-center w-full h-full transition-transform duration-300 ${darkTheme ? '-translate-y-full opacity-0' : 'translate-y-100 opacity-100'}`} onClick={toggleTheme}>
                        <Sun size={30} className="text-yellow-500" />
                    </div>
                    <div className={`cursor-pointer absolute flex items-center justify-center w-full h-full transition-transform duration-300 ${darkTheme ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} onClick={toggleTheme}>
                        <Moon size={30} className="text-blue-500" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header