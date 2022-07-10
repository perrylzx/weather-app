import { useState } from 'react';
import SearchWeather from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import WeatherData from './components/WeatherData';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

const AppContainer = styled.div`
  margin: 10px;
`;

const NotFoundBanner = styled.div`
  background: #f9e5e5;
  border: 1px solid #e6676a;
  padding: 4px 10px;
`;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  return (
    <AppContainer>
      <h1>Today&apos;s Weather</h1>
      <hr />
      <SearchWeather
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
        setWeatherData={setWeatherData}
      />
      {weatherData === null ? null : weatherData.weatherMain ? (
        <WeatherData weatherData={weatherData} />
      ) : (
        <NotFoundBanner> Not found</NotFoundBanner>
      )}

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
    </AppContainer>
  );
}

export default App;
