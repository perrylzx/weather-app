import { useState } from 'react';
import SearchWeather from './components/SearchBar';
import WeatherData from './components/WeatherData';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  return (
    <div>
      <h1>Today&apos;s Weather</h1>
      <hr />
      <SearchWeather setWeatherData={setWeatherData} />
      {weatherData && <WeatherData weatherData={weatherData} />}
    </div>
  );
}

export default App;
