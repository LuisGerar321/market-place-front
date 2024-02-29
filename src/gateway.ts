import Axios from "axios";

export class ResponseError extends Error {
  name: string;
  code: number; // Asumiendo que el código es numérico, cámbialo a string si es necesario

  constructor(name: string, code: number, message: string) {
    super(message);
    this.name = name;
    this.code = code;
  }
}

const axiosInstance = Axios.create({
  baseURL: `${process.env.REACT_APP_API_URL ?? "http://localhost:3001"}/${process.env.REACT_APP_API_VERSION}`,
  headers: {
    Authorization: ``,
  },
  timeout: 30000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      throw new ResponseError("ERR_CONNECTION_REFUSED", 503, "Service is unavailabe, try later");
    }
    return Promise.reject(error);
  },
);
export const gateway = axiosInstance;
