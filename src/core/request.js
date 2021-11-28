import axios from 'axios'
import {Message} from 'element-ui'
import caches from './caches'
import auth from './auth'
import config from '../config'

// create an axios instance
const service = axios.create({
	baseURL: config.BASE_URL, // url = base url + request url
	withCredentials: true, // send cookies when cross-domain requests
	timeout: config.REQUEST_TIMEOUT // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent
		config.headers['content-type'] = 'application/json;charset=UTF-8';

		if (caches.jtoken) {
			// let each request carry token
			// ['X-Token'] is a custom headers key
			// please modify it according to the actual situation
			config.headers['jtoken'] = caches.jtoken
		}
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		const res = response.data

		// if the custom code is not 20000, it is judged as an error.
		if (res.code !== 20000) {
			Message({
				message: res.message || 'Error',
				type: 'error',
				duration: 5 * 1000
			})

			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				// re-login
				auth.logout()
			}
			return Promise.reject(new Error(res.data || 'Error'))
		} else {
			return res
		}
	},
	error => {
		if (error.response.status === 50008 || error.response.status === 50012 || error.response.status === 50014) {
			// re-login
			auth.logout()
		} else {
			Message({
				message: error.message,
				type: 'error',
				duration: 5 * 1000
			})
		}
		return Promise.reject(error)
	}
)

export default service
