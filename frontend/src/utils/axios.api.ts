import { AxiosRequestConfig, default as axios } from 'axios';

const axiosInstance = axios.create({
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export const axiosApi = {
	get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<T>(url, config),
	post: (url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.post(url, data, config),
	patch: (url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.patch(url, data, config),
	delete: (url: string, config?: AxiosRequestConfig) => axiosInstance.delete(url, config),
};
