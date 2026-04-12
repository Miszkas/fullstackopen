import { useState, useEffect } from "react";
import "./index.css";
import Information from "./components/Information.jsx";
import Search from "./components/Search.jsx";
import fetchCountries from "./services/data.js";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (search) {
      fetchCountries(search).then((data) => setCountries(data));
    }
  }, [search]);

  return (
    <>
      <h1>Country Search</h1>
      <Search search={search} setSearch={setSearch} />
      <Information list={countries} country={countries[0]} />
    </>
  );
};

export default App;
