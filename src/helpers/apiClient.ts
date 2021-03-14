import axios, { AxiosInstance } from 'axios';
// import { Request } from 'express';
// import config from 'config';

export const apiClient = (): AxiosInstance => {
	// console.log('>>>> apiClient > REQ > IncomingMessage: ', req);
	const instance = axios.create();

	instance.interceptors.request.use(
		(conf) => {

			return conf;
		},
		(error) => Promise.reject(error),
	);

	instance.interceptors.response.use(
		(response) => response.data,
		(error) => Promise.reject(error.response ? error.response.data : error),
	);

	return instance;
};
