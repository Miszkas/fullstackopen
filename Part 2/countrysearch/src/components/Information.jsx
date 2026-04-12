const Information = ({ list, country }) => {
  if (list.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (list.length === 1) {
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
  } else if (list.length > 1 && list.length <= 10) {
    return (
      <ul>
        {list.map((c) => (
          <li key={c.cca3}>{c.name.common}</li>
        ))}
      </ul>
    );
  } else {
    return <p>Start searching...</p>;
  }
};

export default Information;
