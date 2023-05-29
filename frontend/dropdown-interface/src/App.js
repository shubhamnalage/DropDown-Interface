import React, { useState, useEffect } from 'react';
import api from './appconfig'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Fetch the list of countries when the component mounts
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await api.get('/api/countries');
      setCountries(response.data);
    } catch (error) {
      console.log('Error fetching countries:', error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await api.get(`/api/states/${country}`);
      setStates(response.data);
    } catch (error) {
      console.log('Error fetching states:', error);
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await api.get(`/api/cities/${state}`);
      setCities(response.data);
    } catch (error) {
      console.log('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState('');
    fetchStates(selectedCountry);
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    fetchCities(selectedState);
  };

  return (
    <div>
      <h2>Select Country, State, and City</h2>
      <div>
        <label>Country:</label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>State:</label>
        <select value={selectedState} onChange={handleStateChange}>
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>City:</label>
        <select>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.code} value={city.code}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default App;
