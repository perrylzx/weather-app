import { Select, Button } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import iso from '../iso-3166-2.json';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { parseWeatherData } from '../common';

const { Option } = Select;

const SearchWeather = ({ setWeatherData, searchHistory, setSearchHistory }) => {
  const [countryCode, setCountryCode] = useState(null);
  const [cityName, setCityName] = useState(null);

  const handleSearch = async () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open(
      'GET',
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=a3b10d1cfb3ae8e9d0e4579440228ef4&units=metric`,
      true
    );
    xhttp.addEventListener('load', (e) => {
      const jsonRes = JSON.parse(e.target.response);
      const parsedWeatherData = parseWeatherData(jsonRes, cityName, countryCode);
      setWeatherData(parsedWeatherData);
      setSearchHistory([
        ...searchHistory,
        {
          cityName: parsedWeatherData.cityName,
          countryCode: parsedWeatherData.countryCode,
          time: parsedWeatherData.dt
        }
      ]);
    });
    xhttp.send();
  };

  const handleClear = () => {
    setCityName(null);
    setCountryCode(null);
  };

  return (
    <div>
      <Select
        value={countryCode}
        showSearch
        onChange={(value) => {
          setCountryCode(value);
          setCityName(null);
        }}
        placeholder="Country Code">
        {Object.keys(iso).map((countryCode) => {
          return (
            <Option key={countryCode} value={countryCode}>
              {countryCode}
            </Option>
          );
        })}
      </Select>
      {countryCode && (
        <Select
          value={cityName}
          showSearch
          onChange={(value) => {
            setCityName(value);
          }}
          placeholder="City Name">
          {map(iso[countryCode]?.divisions, (cityName) => (
            <Option key={cityName} value={cityName}>
              {cityName}
            </Option>
          ))}
        </Select>
      )}
      <Button onClick={() => handleSearch()}>Search</Button>
      <Button onClick={() => handleClear()}>Clear</Button>
    </div>
  );
};

SearchWeather.propTypes = {
  setWeatherData: PropTypes.func,
  searchHistory: PropTypes.array,
  setSearchHistory: PropTypes.func
};

export default SearchWeather;
