import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WeatherValues = styled.div`
  display: flex;
  flex-wrap: no-wrap;
`;

const WeatherData = ({ weatherData }) => {
  console.log({ weatherData });
  const { dt, humidity, tempMin, tempMax, weatherDescription, weatherMain, cityName, countryCode } =
    weatherData;
  return (
    <div>
      <h3>{`${cityName}, ${countryCode}`}:</h3>
      <h1>{weatherMain}</h1>
      <WeatherValues>
        <div>
          <h2>Description:</h2>
          <h2>Temperature:</h2>
          <h2>Humidity:</h2>
          <h2>Time:</h2>
        </div>
        <div>
          <h2>{weatherDescription}</h2>
          <h2>{`${tempMin}c ~ ${tempMax}c`}:</h2>
          <h2>{`${humidity}%`}</h2>
          <h2>{moment.unix(dt).format('YYYY-MM-DD HH:mm A')}</h2>
        </div>
      </WeatherValues>
    </div>
  );
};
WeatherData.propTypes = {
  weatherData: PropTypes.object
};

export default WeatherData;
