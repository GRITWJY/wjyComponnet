import request from "@/core/request";

export function uploadFile(params) {
	return request({
		url: '/file/upload',
		method: "post",
		data: params
	})
}