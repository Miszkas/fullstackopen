const Search = ({ search, setSearch }) => {
  return (
    <div>
      <label htmlFor="search">Find countries: </label>
      <input
        type="search"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="search"
      />
    </div>
  );
};

export default Search;
