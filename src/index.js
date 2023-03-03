import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(onCountryInputType, DEBOUNCE_DELAY)
);

function onCountryInputType() {
  const typeName = refs.input.value.trim();

  if (typeName === '') {
    return (refs.list.innerHTML = ''), (refs.info.innerHTML = '');
  }

  fetchCountries(typeName)
    .then(countries => {
      refs.list.innerHTML = '';
      refs.info.innerHTML = '';

      if (countries.length === 1) {
        refs.list.insertAdjacentHTML('beforeend', getCountryList(countries));
        refs.info.insertAdjacentHTML('beforeend', getCountryInfo(countries));
      } else if (countries.length >= 10) {
        specificName();
      } else {
        refs.list.insertAdjacentHTML('beforeend', getCountryList(countries));
      }
    })
    .catch(onWrongNameType);
}

function getCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
    <li class="country-element">
      <img src="${flags.svg}" alt="${flags.alt}" width="35px" height="25px">
      <h2 class="country-name">${name.official}</h2>
    </li>`;
    })
    .join('');
  return markup;
}

function getCountryInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
      <ul>
          <li><p><b>Capital:</b> ${capital}</p></li>
          <li><p><b>Population:</b> ${population}</p></li>
          <li><p><b>Languages:</b> ${Object.values(languages)}</p></li>
      </ul>`;
    })
    .join('');
  return markup;
}

function onWrongNameType() {
  const wrongName = refs.input.value;

  Notiflix.Notify.failure(`Oops, there is no country with that ${wrongName}`);
}

function specificName() {
  Notiflix.Notify.info(
    `Too many matches found. Please enter a more specific name.`
  );
}
