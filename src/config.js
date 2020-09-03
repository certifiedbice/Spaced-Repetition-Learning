export default {
	NODE_ENV:process.env.NODE_ENV||'development',
  	TOKEN_KEY: 'spaced-repetition-client-auth-token',
	API_ENDPOINT:(process.env.NODE_ENV==='development')
		? 'http://localhost:8000/api'
		: 'https://warm-dawn-94119.herokuapp.com/api'
}