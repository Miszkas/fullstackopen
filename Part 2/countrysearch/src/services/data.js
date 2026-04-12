import axios from "axios";

const fetchCountries = async (input) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${input}`,
    );
    return response.data;
  } catch (e) {
    return [];
  }
};

export default fetchCountries;
