import axios, { AxiosResponse, AxiosInstance, AxiosError } from 'axios';

export interface IResponse<T = any> {
  code?: number;
  msg?: string;
  data?: T;
}

const errHandler = (err: AxiosError) => Promise.reject(err);

const request: AxiosInstance = axios.create({
  timeout: 20000,
});

request.interceptors.request.use((config) => config, errHandler);

request.interceptors.response.use((res: AxiosResponse) =>
  Promise.resolve(res.data),
);

export default request;
