import axios from 'axios';
import { PROC_AUTH_TOKEN } from 'shared/consts/localstorage';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:4000',
});

axiosInstance.interceptors.request.use((config) => {
	if (config.headers) {
		const token = localStorage.getItem(PROC_AUTH_TOKEN)?.toString() || '';
		config.headers.authorization = token;
	}
	return config;
});
