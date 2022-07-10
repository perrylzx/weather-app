import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseWeatherData } from '../common';

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const CityCountry = styled.div``;

const DeleteButton = styled(DeleteOutlined)`
  cursor: pointer;
`;

const SearchButton = styled(SearchOutlined)`
  cursor: pointer;
  margin: 0 5px;
`;

const SearchHistory = ({ searchHistory, setSearchHistory, setWeatherData }) => {
  const handleDelete = (searchIndex) => {
    setSearchHistory([
      ...searchHistory.slice(0, searchIndex),
      ...searchHistory.slice(searchIndex + 1)
    ]);
  };

  const handleSearch = async (cityName, countryCode) => {
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
    });
    xhttp.send();
  };

  return (
    <div>
      {searchHistory.map((search, index) => {
        return (
          <>
            <Search key={index}>
              <CityCountry>{`${index + 1}. ${search.cityName}, ${search.countryCode}`}</CityCountry>
              <div>
                {moment.unix(search.time).format('HH:mm:ss A')}
                <SearchButton onClick={() => handleSearch(search.cityName, search.countryCode)} />
                <DeleteButton onClick={() => handleDelete(index)} />
              </div>
            </Search>
            <hr />
          </>
        );
      })}
    </div>
  );
};

SearchHistory.propTypes = {
  searchHistory: PropTypes.array,
  setSearchHistory: PropTypes.func,
  setWeatherData: PropTypes.func
};

export default SearchHistory;
