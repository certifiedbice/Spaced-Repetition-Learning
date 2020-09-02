import config from '../config';
import TokenService from './token-service';

const LanguageService = {
  getAllLanguageData() {
 	 	return fetch(`${config.API_ENDPOINT}/language`,{
			headers:{
				'content-type':'application/json',
				'authorization':`bearer ${TokenService.getAuthToken()}`
				// 'authorization':'bearer fd-auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMywiaWF0IjoxNTk4MjU5Mzk2LCJzdWIiOiJ0ZXN0OUB0ZXN0LmNvbSJ9.JzOZ8xl81kI4n3u1-4v87rwdSGx1hrEbFO3OoljM9cw'
			}
		})
		// .then((res) =>res.status!==401 ? !res.ok ? res.json().then((e) => Promise.reject(e)) : res : UserContext.processLogout())
		.then((res) =>!res.ok ? res.json().then((e) => Promise.reject(e)) : res)
		.catch((error) => console.error(error));
	},
};

export default LanguageService;
