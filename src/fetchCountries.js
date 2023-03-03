const COUNTRIES_BASE = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

export function fetchCountries(nameOfCountries) {
  return fetch(`${COUNTRIES_BASE}${nameOfCountries}?${fields}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}
