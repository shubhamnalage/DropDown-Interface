const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Load country, state, and city data from JSON file
const data = JSON.parse(fs.readFileSync('data.json'));

// API endpoint for fetching the list of countries
app.get('/api/countries', (req, res) => {
  const countries = data.map((item) => ({
    code: item.country_code,
    name: item.country_name,
  }));
  res.json(countries);
});

// API endpoint for fetching the list of states based on the selected country
app.get('/api/states/:country', (req, res) => {
  const selectedCountry = req.params.country;
  const country = data.find((item) => item.country_code === selectedCountry);
  if (!country) {
    res.status(404).json({ message: 'Country not found' });
    return;
  }
  const states = country.states.map((state) => ({
    code: state.state_code,
    name: state.state_name,
  }));
  res.json(states);
});

// API endpoint for fetching the list of cities based on the selected state
app.get('/api/cities/:state', (req, res) => {
  const selectedState = req.params.state;
  const state = data
    .flatMap((item) => item.states)
    .find((state) => state.state_code === selectedState);
  if (!state) {
    res.status(404).json({ message: 'State not found' });
    return;
  }
  const cities = state.cities.map((city) => ({
    code: city.city_code,
    name: city.city_name,
  }));
  res.json(cities);
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
