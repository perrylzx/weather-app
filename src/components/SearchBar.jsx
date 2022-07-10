import { Select, Button } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import iso from '../iso-3166-2.json';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { parseWeatherData } from '../common';
import styled from 'styled-components';

const { Option } = Select;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const InputPrefix = styled.h3`
  margin: 0;
  margin-right: 10px;
`;

const SearchInput = styled(Select)`
  margin-right: 10px;
`;

const SearchButton = styled(Button)`
  margin-right: 10px;
`;

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
      if (parsedWeatherData.weatherMain) {
        setSearchHistory([
          ...searchHistory,
          {
            cityName: parsedWeatherData.cityName,
            countryCode: parsedWeatherData.countryCode,
            time: parsedWeatherData.dt
          }
        ]);
      }
    });
    xhttp.send();
  };

  const handleClear = () => {
    setCityName(null);
    setCountryCode(null);
  };

  return (
    <SearchBarContainer>
      <>
        <InputPrefix>Country Code:</InputPrefix>
        <SearchInput
          value={countryCode}
          showSearch
          onChange={(value) => {
            setCountryCode(value);
            setCityName(null);
          }}
          placeholder="Country">
          {Object.keys(iso).map((countryCode) => {
            return (
              <Option key={countryCode} value={countryCode}>
                {countryCode}
              </Option>
            );
          })}
        </SearchInput>
      </>
      {countryCode && (
        <>
          <InputPrefix>City Name:</InputPrefix>
          <SearchInput
            value={cityName}
            showSearch
            onChange={(value) => {
              setCityName(value);
            }}
            placeholder="City">
            {map(iso[countryCode]?.divisions, (cityName) => (
              <Option key={cityName} value={cityName}>
                {cityName}
              </Option>
            ))}
          </SearchInput>
        </>
      )}
      <SearchButton onClick={() => handleSearch()}>Search</SearchButton>
      <Button onClick={() => handleClear()}>Clear</Button>
    </SearchBarContainer>
  );
};

SearchWeather.propTypes = {
  setWeatherData: PropTypes.func,
  searchHistory: PropTypes.array,
  setSearchHistory: PropTypes.func
};

export default SearchWeather;
