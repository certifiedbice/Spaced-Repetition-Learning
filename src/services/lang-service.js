import config from '../config';

const LanguageService = {
  getAllLanguageData() {
    return fetch(`${config.API_ENDPOINT}/language`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },
};

export default LanguageService;
