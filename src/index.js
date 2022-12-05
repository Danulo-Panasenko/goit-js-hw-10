import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInpute, DEBOUNCE_DELAY));
function onInpute(e) {
  const name = e.target.value.trim();
  if (name === '') {
    clearInput();
    return;
  }
  fetchCountries(name).then(checkingInputLength).catch(showFailureNotification);
}

function checkingInputLength(value) {
  if (value.length >= 11) {
    clearInput();
    Notiflix.Notify.success(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (value.length === 1) {
    clearInput();
    const markup = value
      .map(({ name, capital, population, flags, languages }) => {
        let lang = '';
        for (const key of languages) {
          const lang = languages[key];
        }
        return `<div class="country-info-name"> <ul class=" country-list"><li class=" country-name"><img src="${flags.svg}" alt="flag" width='20' height ='15' >${name.official}</li></ul>
    <p>Сapital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${lang}</p></div>`;
      })
      .join('');
    console.log(markup);
    refs.list.insertAdjacentHTML('beforeend', markup);
  } else {
    clearInput();
    const listName = value
      .map(({ name, flags }) => {
        return `
    <li><img src="${flags.svg}" alt="flag" width='20' height ='15' >${name.official}</li>
    `;
      })
      .join('');

    console.log(listName);
    refs.list.insertAdjacentHTML('beforeend', listName);
  }
}
function showFailureNotification(error) {
  if (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}

function clearInput() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}
