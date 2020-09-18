import config from '../config';
import TokenService from './token-service';

const LanguageService = {
  getAllLanguageData() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },
  getLanguageHead() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },
  postGuess(guess) {
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({guess}),
    })
    .then(res=>(!res.ok) ? res.json().then((e) => Promise.reject(e)) : res.json())
    .catch((error) => console.error(error));
  },
};

export default LanguageService;
