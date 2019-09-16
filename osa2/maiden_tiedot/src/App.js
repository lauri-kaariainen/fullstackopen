import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Components/Countries";

const Filter = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [singleCountryData, setSingleCountryData] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => setCountries(res.data));
  }, []);

  const visibleCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showSingleCountry =
    visibleCountries.length === 1 ||
    visibleCountries.filter(
      country => country.name.toLowerCase() === searchTerm.toLowerCase()
    ).length === 1;

  const handleSearchTermChange = evt => setSearchTerm(evt.target.value);

  return (
    <div>
      find countries{" "}
      <Filter value={searchTerm} onChange={handleSearchTermChange} />
      <Countries
        visibleCountries={
          showSingleCountry
            ? [{ name: searchTerm.toLowerCase() }]
            : visibleCountries
        }
        singleCountryData={singleCountryData}
        setSingleCountryData={setSingleCountryData}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default App;
