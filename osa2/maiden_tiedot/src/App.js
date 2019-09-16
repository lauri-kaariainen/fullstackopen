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
  const [showSingleCountry, setShowSingleCountry] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => setCountries(res.data));
  }, []);

  const getMostSimilarCountry = (countryName, arrayOfCountries) => {
    const perfectMatch = arrayOfCountries.find(
      country1 => countryName === country1.name
    );
    if (perfectMatch) return perfectMatch;
    const caseInperfectMatch = arrayOfCountries.find(
      country1 => countryName.toLowerCase() === country1.name.toLowerCase()
    );
    if (caseInperfectMatch) return caseInperfectMatch;
    else
      return arrayOfCountries.filter(country1 =>
        country1.name.toLowerCase().includes(countryName.toLowerCase())
      )[0];
  };

  const visibleCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadSingleCountryData = countryName =>
    countryName === singleCountryData.name ? null :
      axios
        .get("https://restcountries.eu/rest/v2/name/" + countryName)
        .then(
          res =>
            console.log("loaded country:", res.data) ||
            setSingleCountryData(getMostSimilarCountry(countryName, res.data))
        );

  const perfectMatch =
    visibleCountries
      .find(
        country => country.name.toLowerCase() === searchTerm.toLowerCase())

  console.log(
    "length", visibleCountries.length,
    "perfectmatch", perfectMatch,
    "showSingleCountry", showSingleCountry,
    "singeCtrydata", singleCountryData ? singleCountryData.name : undefined)

  if ((visibleCountries.length === 1 || perfectMatch) && !showSingleCountry)
    setShowSingleCountry(true);

  if (visibleCountries.length > 1 && !perfectMatch && showSingleCountry)
    setShowSingleCountry(false);


  if (showSingleCountry && visibleCountries.length)
    loadSingleCountryData(perfectMatch ? perfectMatch.name : visibleCountries[0].name)

  const handleSearchTermChange = evt => setSearchTerm(evt.target.value);

  return (
    <div>
      find countries{" "}
      <Filter value={searchTerm} onChange={handleSearchTermChange} />
      <Countries
        visibleCountries={visibleCountries}
        showSingleCountry={showSingleCountry}
        singleCountryData={singleCountryData}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default App;
