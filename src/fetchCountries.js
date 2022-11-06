export default function fetchCountries(name) {
    const URL = 'https://restcountries.com/v3.1/name/';

    return fetch(`${URL}${name}?fields=name,capital,population,flags,languages`)
        .then(responce => {
            if (!responce.ok) {
                throw new Error(responce.statusText);
                }
            return responce.json();
            });
}