import request from "@/core/request";

export function getFightList(params) {
	return request({
		url: '/fight/select',
		method: 'post',
		data: params
	})
}


export function getSeat(params) {
	return request({
		url: '/seat/list',
		method: 'post',
		data: params
	})
}


export function addSeat(params) {
	return request({
		url: '/seat/add',
		method: 'post',
		data: params
	})
}
