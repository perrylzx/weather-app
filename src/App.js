import { useState } from 'react';
import SearchWeather from './components/SearchBar';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  return (
    <div>
      <SearchWeather setWeatherData={setWeatherData} />
    </div>
  );
}

export default App;
