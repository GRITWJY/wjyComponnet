import axios from 'axios'

// create an axios instance
const service = axios.create({
	baseURL: 'http://localhost:9000',
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent
		config.headers['content-type'] = 'application/json;charset=UTF-8';
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	response => {

		if (response.status === 200) {
			return Promise.resolve(response.data)
		} else {
			return Promise.reject(response.data)
		}

	},
	error => {
		return Promise.reject(error)
	}
)

export default service
