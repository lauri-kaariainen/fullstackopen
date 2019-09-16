import React, { useEffect } from "react";
import axios from "axios";
import Weather from "./Weather.js";

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

const LessThan11CountriesDisplay = ({ visibleCountries, setSearchTerm }) => (
  <>
    {visibleCountries.map(country => (
      <div key={country.alpha2Code}>
        {country.name + " "}
        <button onClick={() => setSearchTerm(country.name)}>show</button>
      </div>
    ))}
  </>
);

const SingleCountryDisplay = ({ singleCountryData }) => (
  <div className={"singleCountryDiv"}>
    <h2>{singleCountryData.name}</h2>
    <div>capital{" " + singleCountryData.capital}</div>
    <div>population{" " + singleCountryData.population}</div>
    <h3>languages</h3>
    <ul>
      {singleCountryData.languages.map(lang => (
        <li key={lang.name}>{lang.name}</li>
      ))}
    </ul>
    <img
      alt={singleCountryData.name + "'s flag"}
      src={singleCountryData.flag}
      height={"200px"}
    />
    <Weather location={singleCountryData.capital} />
  </div>
);

const SingleCountry = ({
  countryName,
  singleCountryData,
  setSingleCountryData
}) => {
  useEffect(() => {
    console.log("SingleCountry effect loaded:", countryName);
    axios
      .get("https://restcountries.eu/rest/v2/name/" + countryName)
      .then(
        res =>
          console.log(res.data) ||
          setSingleCountryData(getMostSimilarCountry(countryName, res.data))
      );
  }, [countryName, setSingleCountryData]);
  return (
    <>
      {singleCountryData.name ? (
        <SingleCountryDisplay singleCountryData={singleCountryData} />
      ) : (
          <div>Loading:{" " + countryName}</div>
        )}
    </>
  );
};

const Countries = ({
  visibleCountries,
  singleCountryData,
  setSingleCountryData,
  setSearchTerm
}) => {
  return (
    <div>
      {!visibleCountries.length ? (
        <div>no countries found with search term</div>
      ) : visibleCountries.length === 1 ? (
        <SingleCountry
          countryName={visibleCountries[0].name}
          singleCountryData={singleCountryData}
          setSingleCountryData={setSingleCountryData}
        />
      ) : visibleCountries.length > 10 ? (
        <div>too many hits with search term: {visibleCountries.length}</div>
      ) : (
              <LessThan11CountriesDisplay
                visibleCountries={visibleCountries}
                setSearchTerm={setSearchTerm}
              />
            )}
    </div>
  );
};

export default Countries;
