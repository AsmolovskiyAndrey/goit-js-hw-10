import './css/styles.css';
// import fetchCountries from "./fetchCountries.js";
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const inputRef = document.querySelector('input')
const DEBOUNCE_DELAY = 300;

inputRef.addEventListener('input',debounce(getName, DEBOUNCE_DELAY))

function getName(event) {
    const country = event.target.value
    // if (!country) {
    //     document.querySelector('.country-list').innerHTML = "";
    //     return
    // }
    fetchCountries(`${country}`);
}


let len = 0
let data = {}
const API = 'https://restcountries.com/v3.1'

function fetchCountries(nameContry) {
    fetch(`${API}/name/${nameContry}`)
        .then(response => {
            if (!response.ok) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                return
            } else {
                fetch(`${API}/name/${nameContry}`)
                .then(response => response.json())
                .then(data => console.log(data))
            }

        
            len = data.length
            console.log(len);
            // if (len > 10) {
            //     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            //     return
            // }
            // if (len >= 2 && len <= 10) {
            //     createFromTwoToTenPages(data)
            //     return
            //     }
            // if (len = 1) {
            //     createOnePage(data)
            //     return
            // }
        })
}

function createOnePage(data) {
    let markup = data.map(countries => `
            <div class="country-info">
                <span class="js-country_name">
                    <img class="country_img" src="${countries.flags.png}" alt="${countries.name.common}">
                    ${countries.name.official}
                </span>
                <p class="country_properties"><strong>Capital: </strong>${countries.capital}</p>
                <p class="country_properties"><strong>Population: </strong>${countries.population}</p>
                <p class="country_properties"><strong>Languages: </strong>${Object.values(countries.languages)}</p>
            </div>
            `).join('')
                document.querySelector('.country-list').innerHTML = markup;
}

function createFromTwoToTenPages(data) {
    let markup = data.map(countries => `
                <div class="country-info">
                    <span class="js-country_name">
                        <img class="country_img" src="${countries.flags.png}" alt="${countries.name.common}">
                        ${countries.name.official}
                    </span>
                </div>
                `).join('')

                document.querySelector('.country-list').innerHTML = markup;
}

