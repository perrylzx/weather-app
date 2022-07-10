import { Select, Button } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import iso from '../iso-3166-2.json';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';

const { Option } = Select;

const SearchWeather = ({ setWeatherData }) => {
  const [countryCode, setCountryCode] = useState(null);
  const [cityName, setCityName] = useState(null);

  const parseWeatherData = (jsonRes) => {
    const [tempMin, tempMax, humidity, weatherMain, weatherDescription, dt] = [
      get(jsonRes, ['main', 'temp_min']),
      get(jsonRes, ['main', 'temp_max']),
      get(jsonRes, ['main', 'humidity']),
      get(jsonRes, ['weather', '0', 'main']),
      get(jsonRes, ['weather', '0', 'description']),
      get(jsonRes, ['dt'])
    ];

    return {
      tempMin,
      tempMax,
      humidity,
      weatherMain,
      weatherDescription,
      dt,
      cityName,
      countryCode
    };
  };

  const handleSearch = async () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open(
      'GET',
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=a3b10d1cfb3ae8e9d0e4579440228ef4&units=metric`,
      true
    );
    xhttp.addEventListener('load', (e) => {
      const jsonRes = JSON.parse(e.target.response);
      const parsedWeatherData = parseWeatherData(jsonRes);
      setWeatherData(parsedWeatherData);
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
  setWeatherData: PropTypes.func
};

export default SearchWeather;
