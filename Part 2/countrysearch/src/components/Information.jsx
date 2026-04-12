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
    </div>
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
