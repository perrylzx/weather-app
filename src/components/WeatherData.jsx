import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WeatherValues = styled.div`
  display: flex;
  flex-wrap: no-wrap;
`;

const WeatherDataContainer = styled.div`
  padding: 30px;
`;

const WeatherPropertyName = styled.h3`
  color: #777777;
`;

const WeatherPropertyNameContainer = styled.div`
  margin-right: 10px;
`;

const WeatherData = ({ weatherData }) => {
  const { dt, humidity, tempMin, tempMax, weatherDescription, weatherMain, cityName, countryCode } =
    weatherData;
  return (
    <WeatherDataContainer>
      <WeatherPropertyName>{`${cityName}, ${countryCode}`}:</WeatherPropertyName>
      <h1>{weatherMain}</h1>
      <WeatherValues>
        <WeatherPropertyNameContainer>
          <WeatherPropertyName>Description:</WeatherPropertyName>
          <WeatherPropertyName>Temperature:</WeatherPropertyName>
          <WeatherPropertyName>Humidity:</WeatherPropertyName>
          <WeatherPropertyName>Time:</WeatherPropertyName>
        </WeatherPropertyNameContainer>
        <div>
          <h3>{weatherDescription}</h3>
          <h3>{`${tempMin}c ~ ${tempMax}c`}:</h3>
          <h3>{`${humidity}%`}</h3>
          <h3>{moment.unix(dt).format('YYYY-MM-DD hh:mm A')}</h3>
        </div>
      </WeatherValues>
    </WeatherDataContainer>
  );
};
WeatherData.propTypes = {
  weatherData: PropTypes.object
};

export default WeatherData;
