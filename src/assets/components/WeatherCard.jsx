import PropTypes from 'prop-types';

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="h-full overflow-scroll p-4 rounded shadow-lg">
      {weatherData.length > 0 ? (
        <div className="flex flex-col gap-4">
          {weatherData.map((data, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-200 text-black shadow-md mb-4">
              <h2 className="text-2xl font-bold text-blue-500">{data.name}, {data.state}, {data.country}</h2>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <p><span className="font-bold">Latitude:</span> {data.lat}</p>
                <p><span className="font-bold">Longitude:</span> {data.lon}</p>
              </div>
              {data.weather && (
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-between text-lg items-center p-4 rounded-lg">
                  <p><span className="font-bold">Temperature:</span> {Math.round(data.weather.main.temp - 273.15)}°C</p>
                  <p><span className="font-bold">Humidity:</span> {data.weather.main.humidity}%</p>
                  <p><span className="font-bold">Wind Speed:</span> {data.weather.wind.speed} m/s</p>
                  <p><span className="font-bold">Weather:</span> {data.weather.weather[0].description}</p>
                  {data.weather.weather[0].icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather.weather[0].icon}.png`}
                      alt={data.weather.weather[0].description}
                      className="w-14 h-14"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24"><path fill="#6B7280" d="M6 19a5 5 0 0 1-5-5a5 5 0 0 1 5-5c1-2.35 3.3-4 6-4c3.43 0 6.24 2.66 6.5 6.03L19 11a4 4 0 0 1 4 4a4 4 0 0 1-4 4zm13-6h-2v-1a5 5 0 0 0-5-5c-2.5 0-4.55 1.82-4.94 4.19C6.73 11.07 6.37 11 6 11a3 3 0 0 0-3 3a3 3 0 0 0 3 3h13a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/></svg>
          <div className="text-3xl font-bold text-[#6B7280] mt-4">No weather data found</div>
          <div className="text-[#6B7280] mt-2">Try searching for a different location</div>
        </div>
      )}
    </div>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    weather: PropTypes.shape({
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired
      }),
      wind: PropTypes.shape({
        speed: PropTypes.number.isRequired
      }),
      weather: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired // Añadido para el icono del clima
      })).isRequired
    })
  })).isRequired
};

export default WeatherCard;
