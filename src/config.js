export default {
  API_ENDPOINT:
    process.env.REACT_APP_ENV === 'development'
      ? 'https://warm-dawn-94119.herokuapp.com/api'
      : 'http://localhost:8000',
  TOKEN_KEY: 'spaced-repetition-client-auth-token',
};
