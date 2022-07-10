import { useState } from 'react';
import SearchWeather from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import WeatherData from './components/WeatherData';
import { isEmpty } from 'lodash';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  return (
    <div>
      <h1>Today&apos;s Weather</h1>
      <hr />
      <SearchWeather
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
        setWeatherData={setWeatherData}
      />
      {weatherData && <WeatherData weatherData={weatherData} />}
      {!isEmpty(searchHistory) && (
        <>
          <h1>Search History</h1>
          <hr />
          <SearchHistory
            setWeatherData={setWeatherData}
            setSearchHistory={setSearchHistory}
            searchHistory={searchHistory}
          />
        </>
      )}
    </div>
  );
}

export default App;
