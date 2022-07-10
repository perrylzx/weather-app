import { get } from 'lodash';

export const parseWeatherData = (jsonRes, cityName, countryCode) => {
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
