import axios from 'axios';


const IdentityService = {
	login,
	register,
	getUserProfile,
};


function login(username, password) {
	return axios({
		method : 'POST',
		url    : 'https://btwapi-18.herokuapp.com/user/login',
		data   : {
			"username": username,
			"password": password
		},
		headers: {
			"Content-Type": "application/json",
		}
	})
		.then(response => {
			if (!response.data.token) {
				return Promise.reject(response.data);
			}
			return response.data;
		})
}

function register(state) {
	return axios({
		method : 'POST',
		url    : 'https://btwapi-18.herokuapp.com/user/register',
		data   : {
			"username" : state.username,
			"password" : state.password,
			"email"    : state.email,
			"firstname": state.firstname,
			"lastname" : state.lastname
		},
		headers: {
			"Content-Type": "application/json",
		}
	})
}


function getUserProfile(token, username) {
	return axios({
		method : 'GET',
		url    : 'https://btwapi-18.herokuapp.com/api/v1/getUser',
		params: {

		},
		headers: {
			"Content-Type"  : "application/json",
			"x-access-token": token,
			"x-key": username
		}
	})
		.then(response => {
			console.log('Service ' + response)
			if (response.data.status !== 200) {
				return Promise.reject(response.data);
			}
			return response.data;
		})
}


export default IdentityService