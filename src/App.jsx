import { useState } from 'react';
import './index.css';
import WeatherCard from './assets/components/WeatherCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const API_KEY = '815d9d19eb68220af3fc75543650e432';

  const fetchWeatherData = async (city) => {
    try {
      const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`);
      if (!geoResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const geoData = await geoResponse.json();

      const weatherPromises = geoData.map(async (location) => {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`);
        if (!weatherResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const weatherData = await weatherResponse.json();
        return { ...location, weather: weatherData };
      });

      const detailedWeatherData = await Promise.all(weatherPromises);
      console.log(detailedWeatherData);
      setWeatherData(detailedWeatherData);
      console.log('Weather data fetched successfully!');
    } catch (error) {
      console.error('Fetch error:', error);
      setWeatherData(null);
      toast.error('Failed to fetch weather data. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === '') {
      setWeatherData(null);
    }
  };

  const handleSearchClick = () => {
    if (inputValue.trim() === '') {
      toast.warning('Please enter a city name.');
    } else {
      fetchWeatherData(inputValue); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2">
      <ToastContainer position='top-center'/>
      <div className="flex flex-col md:flex-row justify-between bg-black shadow-xl p-2 rounded-xl w-full">
        <div className='flex justify-center items-center gap-4 mt-2 ps-2 h-full'>
          <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 100 100"><path fill="white" d="M2.5 12.5A2.5 2.5 0 0 0 0 15v70a2.5 2.5 0 0 0 2.5 2.5h95A2.5 2.5 0 0 0 100 85V15a2.5 2.5 0 0 0-2.5-2.5zm2.5 5h72.066c-3.48 1.554-6.828 3.507-10.025 5.742c-9.537 6.667-17.823 15.814-24.639 24.356l-.015.02l-.016.019C32.274 61.179 20.148 68.395 5 71.057zm81.447 0H95v13.598c-12.444-1.557-21.873.893-28.824 4.302l-.008.004l-.01.004c-13.24 6.71-17.638 16.772-21.726 26.25c-3.34 7.743-6.488 15.087-14.248 20.842H5v-8.451c16.007-2.72 29.157-10.397 39.746-24.58c6.726-8.43 14.866-17.373 24.014-23.768c5.567-3.892 11.476-6.834 17.687-8.201m-62.324 2.586a2 2 0 0 0-1.969 2.027v5.067a10.28 10.28 0 0 0-3.71 1.533l-3.58-3.58a2 2 0 0 0-1.436-.606a2 2 0 0 0-1.395 3.434l3.578 3.578a10.28 10.28 0 0 0-1.539 3.715H9.014a2 2 0 1 0 0 4h5.066a10.28 10.28 0 0 0 1.535 3.709l-3.582 3.582a2 2 0 1 0 2.83 2.828l3.578-3.578a10.28 10.28 0 0 0 3.713 1.539v5.059a2 2 0 1 0 4 0v-5.067a10.28 10.28 0 0 0 3.711-1.533l3.58 3.58a2 2 0 1 0 2.828-2.828l-3.578-3.578a10.28 10.28 0 0 0 1.54-3.713h5.058a2 2 0 1 0 0-4h-5.064a10.28 10.28 0 0 0-1.538-3.711l3.582-3.582a2 2 0 0 0-1.453-3.434a2 2 0 0 0-1.375.606l-3.578 3.578a10.28 10.28 0 0 0-3.713-1.54v-5.058a2 2 0 0 0-2.031-2.027m63.02 13.416l5.138 8.191L95 38.236V82.5H34.85a36.017 36.017 0 0 0 1.671-1.646l10.985-.463l-3.94-9.684c1.346-2.602 2.496-5.25 3.621-7.86c3.384-7.843 6.603-15.35 14.645-21.275l10.012 4.518l.812-10.147c.433-.15.874-.295 1.323-.435l7.216 6.992l4.055-8.947c.62-.03 1.25-.045 1.893-.051M69.518 52.873c-3.5 0-6.585 2.26-7.6 5.563a6.276 6.276 0 0 0-1.516-.196c-3.42 0-6.193 2.736-6.193 6.11c0 3.215 2.518 5.844 5.715 6.086a8.465 8.465 0 0 1-.067-1.018c0-4.744 3.94-8.61 8.694-8.61a2.5 2.5 0 0 1 .015 0c.027 0 .052.01.079.01c1.48-2.63 4.003-4.52 6.953-5.138a7.967 7.967 0 0 0-6.08-2.807m8.148 5.068c-3.499 0-6.585 2.26-7.6 5.563a6.276 6.276 0 0 0-1.515-.195c-3.42 0-6.193 2.735-6.194 6.109c0 3.374 2.773 6.11 6.194 6.11h15.633c2.858 0 5.174-2.285 5.173-5.104c-.002-2.279-1.537-4.28-3.76-4.903c-.139-4.223-3.647-7.577-7.931-7.58"/></svg>
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
        </div>
        <div className='flex gap-5 justify-end p-2'>
          <div className="relative w-full">
            <input 
              type="text" 
              value={inputValue} 
              onChange={handleInputChange} 
              className="w-full p-3 border-2 border-blue-400 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500 pr-12 transition duration-300 ease-in-out" 
              placeholder="Enter city"
            />
            <button 
              onClick={handleSearchClick} 
              className="absolute right-0 top-0 bottom-0 p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-r-lg hover:shadow-lg transform hover:scale-110 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      <div className='h-[80vh] w-full'>
        {weatherData 
        ? <WeatherCard weatherData={weatherData} /> 
        : inputValue.trim() === ''
          ? <div className='h-full flex flex-col justify-center items-center'>
              <p className="text-4xl font-bold text-[#6B7280]">Welcome to the Weather App!</p>
              <p className="text-2xl font-bold text-[#6B7280]">Start by searching for a location above.</p>
            </div>
          : null
        }
      </div>
    </div>
  );
};

export default App;
