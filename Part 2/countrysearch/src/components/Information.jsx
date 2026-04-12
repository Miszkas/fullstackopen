import axios from "axios";
import { useEffect, useState } from "react";

const ShowList = ({ list, setSelectedCountry }) => {
  return (
    <ul>
      {list.map((c) => (
        <li key={c.cca3}>
          {c.name.common}{" "}
          <button onClick={() => setSelectedCountry(c)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

const ShowCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <ShowWeather country={country} />
    </div>
  );
};

const ShowWeather = ({ country }) => {
  const API_KEY = import.meta.env.VITE_FORECAST_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setTimeout(() => {}, 800);
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}`,
        );
        setWeather(response.data);
      } catch (error) {
        setWeather(null);
      }
    };
    fetchWeather();
  }, [country.capital]);

  return (
    <>
      <h3>Weather in {country.capital}</h3>
      {!weather ? (
        "Weather data not available"
      ) : (
        <div>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </>
  );
};

const Information = ({
  list,
  country,
  selectedCountry,
  setSelectedCountry,
}) => {
  if (selectedCountry) {
    return <ShowCountry country={selectedCountry} />;
  } else if (list.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (list.length > 1 && list.length <= 10) {
    return <ShowList list={list} setSelectedCountry={setSelectedCountry} />;
  } else if (list.length === 1) {
    return <ShowCountry country={country} />;
  } else {
    return <p>Start searching...</p>;
  }
};

export default Information;
